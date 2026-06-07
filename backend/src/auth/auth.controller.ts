import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  // Schedule the signed-in user's account for deletion after a 30-day grace
  // period. Backs the in-app "Delete account" action and the public deletion
  // page. Signing in again before the scheduled date cancels the deletion.
  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteMe(
    @CurrentUser() user: AuthUser,
  ): Promise<{ scheduledDeletionAt: string }> {
    const { scheduledDeletionAt } = await this.auth.requestAccountDeletion(
      user.id,
    );
    return { scheduledDeletionAt: scheduledDeletionAt.toISOString() };
  }
}
