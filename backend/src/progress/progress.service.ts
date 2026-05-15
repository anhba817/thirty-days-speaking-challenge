import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../storage/s3.service';
import type { SaveAttemptDto } from './dto/save-attempt.dto';

@Injectable()
export class ProgressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: S3Service,
  ) {}

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
      attempts: attempts.map(stripAudioKey),
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

  async saveAttempt(userId: string, body: SaveAttemptDto) {
    const created = await this.prisma.attempt.create({
      data: {
        userId,
        dayId: body.dayId,
        questionIx: body.questionIx,
        transcript: body.transcript,
        feedback: body.feedback as Prisma.InputJsonValue,
        score: body.score,
        audioMimeType: body.audioMimeType,
      },
    });

    if (!body.audioBase64 || !body.audioMimeType) {
      return { attempt: stripAudioKey(created) };
    }

    const key = this.s3.buildAudioKey({
      userId,
      attemptId: created.id,
      mimeType: body.audioMimeType,
    });

    const buffer = Buffer.from(body.audioBase64, 'base64');
    await this.s3.uploadBuffer(key, buffer, body.audioMimeType);

    const updated = await this.prisma.attempt.update({
      where: { id: created.id },
      data: { audioKey: key },
    });

    return { attempt: stripAudioKey(updated) };
  }

  async getAttemptAudioUrl(userId: string, attemptId: string) {
    const attempt = await this.prisma.attempt.findFirst({
      where: { id: attemptId, userId },
      select: { audioKey: true, audioMimeType: true },
    });
    if (!attempt) {
      throw new NotFoundException('Attempt not found');
    }
    if (!attempt.audioKey) {
      throw new NotFoundException('Attempt has no recorded audio');
    }
    const presigned = await this.s3.getPresignedGetUrl(attempt.audioKey);
    return { ...presigned, mimeType: attempt.audioMimeType ?? undefined };
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

type AttemptRow = {
  id: string;
  userId: string;
  dayId: number;
  questionIx: number;
  transcript: string | null;
  feedback: Prisma.JsonValue;
  score: number;
  audioKey: string | null;
  audioMimeType: string | null;
  createdAt: Date;
};

// audioKey is an internal S3 path; clients only need to know whether audio
// exists. They fetch a presigned URL on demand via GET /attempts/:id/audio.
function stripAudioKey(attempt: AttemptRow) {
  const { audioKey, ...rest } = attempt;
  return { ...rest, hasAudio: Boolean(audioKey) };
}
