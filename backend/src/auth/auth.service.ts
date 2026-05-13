import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from '../prisma/prisma.service';
import type { JwtPayload } from './auth.types';

@Injectable()
export class AuthService implements OnModuleInit {
  private oauthClient!: OAuth2Client;
  private clientId!: string;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  onModuleInit() {
    this.clientId = this.config.getOrThrow<string>('GOOGLE_CLIENT_ID');
    this.oauthClient = new OAuth2Client(this.clientId);
  }

  async loginWithGoogle(idToken: string) {
    let payload;
    try {
      const ticket = await this.oauthClient.verifyIdToken({
        idToken,
        audience: this.clientId,
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
}
