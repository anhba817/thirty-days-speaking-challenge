import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { SaveAttemptDto } from './dto/save-attempt.dto';

@Injectable()
export class ProgressService {
  constructor(private readonly prisma: PrismaService) {}

  async getProgress(userId: string) {
    const [completedDays, attempts] = await this.prisma.$transaction([
      this.prisma.completedDay.findMany({
        where: { userId },
        orderBy: { dayId: 'asc' },
      }),
      this.prisma.attempt.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 200,
      }),
    ]);

    return {
      completedDays: completedDays.map((c) => c.dayId),
      attempts,
    };
  }

  async markDayComplete(userId: string, dayId: number) {
    await this.prisma.completedDay.upsert({
      where: { userId_dayId: { userId, dayId } },
      update: {},
      create: { userId, dayId },
    });
    return { dayId };
  }

  saveAttempt(userId: string, body: SaveAttemptDto) {
    return this.prisma.attempt.create({
      data: {
        userId,
        dayId: body.dayId,
        questionIx: body.questionIx,
        transcript: body.transcript,
        feedback: body.feedback as Prisma.InputJsonValue,
        score: body.score,
      },
    });
  }

  async mergeCompletedDays(userId: string, dayIds: number[]) {
    if (dayIds.length) {
      await this.prisma.completedDay.createMany({
        data: dayIds.map((dayId) => ({ userId, dayId })),
        skipDuplicates: true,
      });
    }
    return this.getProgress(userId);
  }
}
