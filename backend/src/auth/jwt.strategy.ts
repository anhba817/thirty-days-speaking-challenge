import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
import type { AuthUser, JwtPayload } from './auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  // Validate against the DB on every request so we can reject tokens for
  // accounts that no longer exist or are pending deletion. A pending-deletion
  // account is blocked from all API access until the user signs in again,
  // which clears the flag (see AuthService.loginWithGoogle).
  async validate(payload: JwtPayload): Promise<AuthUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, name: true, deletionScheduledAt: true },
    });
    if (!user) {
      throw new UnauthorizedException('Account not found');
    }
    if (user.deletionScheduledAt) {
      throw new UnauthorizedException(
        'Account is scheduled for deletion. Sign in again to restore it.',
      );
    }
    return { id: user.id, email: user.email, name: user.name };
  }
}
