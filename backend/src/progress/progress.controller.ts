import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthUser } from '../auth/auth.types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MergeProgressDto } from './dto/merge-progress.dto';
import { SaveAttemptDto } from './dto/save-attempt.dto';
import { ProgressService } from './progress.service';

@UseGuards(JwtAuthGuard)
@Controller('api/progress')
export class ProgressController {
  constructor(private readonly progress: ProgressService) {}

  @Get()
  getProgress(@CurrentUser() user: AuthUser) {
    return this.progress.getProgress(user.id);
  }

  @Post('days/:dayId')
  markDay(
    @CurrentUser() user: AuthUser,
    @Param('dayId', ParseIntPipe) dayId: number,
  ) {
    return this.progress.markDayComplete(user.id, dayId);
  }

  @Post('attempts')
  saveAttempt(@CurrentUser() user: AuthUser, @Body() body: SaveAttemptDto) {
    return this.progress.saveAttempt(user.id, body);
  }

  @Post('merge')
  merge(@CurrentUser() user: AuthUser, @Body() body: MergeProgressDto) {
    return this.progress.mergeCompletedDays(user.id, body.dayIds);
  }
}
