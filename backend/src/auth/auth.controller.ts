import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from './current-user.decorator';
import { GoogleLoginDto } from './dto/google-login.dto';
import { AuthService } from './auth.service';
import type { AuthUser } from './auth.types';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('google')
  google(@Body() body: GoogleLoginDto) {
    return this.auth.loginWithGoogle(body.idToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: AuthUser): AuthUser {
    return user;
  }
}
