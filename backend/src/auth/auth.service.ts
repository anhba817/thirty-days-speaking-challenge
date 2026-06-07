import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../storage/s3.service';
import type { JwtPayload } from './auth.types';

@Injectable()
export class AuthService implements OnModuleInit {
  private oauthClient!: OAuth2Client;
  private audiences!: string[];

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly s3: S3Service,
  ) {}

  onModuleInit() {
    const primary = this.config.getOrThrow<string>('GOOGLE_CLIENT_ID');
    const extra = this.config.get<string>('GOOGLE_CLIENT_IDS') ?? '';
    const additional = extra
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    this.audiences = Array.from(new Set([primary, ...additional]));
    this.oauthClient = new OAuth2Client(primary);
  }

  async loginWithGoogle(idToken: string) {
    let payload;
    try {
      const ticket = await this.oauthClient.verifyIdToken({
        idToken,
        audience: this.audiences,
      });
      payload = ticket.getPayload();
    } catch {
      throw new UnauthorizedException('Invalid Google ID token');
    }

    if (!payload?.sub || !payload.email) {
      throw new UnauthorizedException('Google token missing required claims');
    }

    const user = await this.prisma.user.upsert({
      where: { googleId: payload.sub },
      update: {
        email: payload.email,
        name: payload.name ?? null,
        avatarUrl: payload.picture ?? null,
        // Signing in again cancels a pending deletion (account recovery
        // within the 30-day grace period).
        deletionScheduledAt: null,
      },
      create: {
        googleId: payload.sub,
        email: payload.email,
        name: payload.name ?? null,
        avatarUrl: payload.picture ?? null,
      },
    });

    const jwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    const token = await this.jwt.signAsync(jwtPayload);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  /**
   * Schedule a user's account for deletion after a 30-day grace period.
   * Their data is retained until then and the deletion is cancelled if they
   * sign in again (see loginWithGoogle). Returns the scheduled purge date.
   */
  async requestAccountDeletion(userId: string): Promise<{
    scheduledDeletionAt: Date;
  }> {
    const scheduledDeletionAt = new Date(Date.now() + GRACE_PERIOD_MS);
    await this.prisma.user.update({
      where: { id: userId },
      data: { deletionScheduledAt: scheduledDeletionAt },
    });
    return { scheduledDeletionAt };
  }

  /**
   * Permanently delete a user and all associated data: stored audio in S3,
   * then the User row (CompletedDay + Attempt rows cascade via the schema).
   * Idempotent — purging an already-removed account is a no-op.
   */
  async purgeAccount(userId: string): Promise<void> {
    // Remove audio first; if the DB row is gone we'd lose the userId needed
    // to locate the objects.
    await this.s3.deleteUserAudio(userId);
    await this.prisma.user.deleteMany({ where: { id: userId } });
  }

  /**
   * Purge every account whose grace period has elapsed. Run on a schedule.
   * Returns the number of accounts purged.
   */
  async purgeExpiredAccounts(): Promise<number> {
    const expired = await this.prisma.user.findMany({
      where: { deletionScheduledAt: { not: null, lte: new Date() } },
      select: { id: true },
    });
    for (const { id } of expired) {
      await this.purgeAccount(id);
    }
    return expired.length;
  }
}

// 30-day grace period before a deletion request is permanently applied.
const GRACE_PERIOD_MS = 30 * 24 * 60 * 60 * 1000;
