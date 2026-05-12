import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeminiModule } from './gemini/gemini.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        GEMINI_API_KEY: Joi.string().required(),
        GEMINI_TIMEOUT_MS: Joi.number().integer().min(1000).default(30_000),
        PORT: Joi.number().port().default(3001),
        FRONTEND_ORIGIN: Joi.string()
          .uri({ scheme: ['http', 'https'] })
          .default('http://localhost:3000'),
      }),
      validationOptions: { abortEarly: false },
    }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 20 }]),
    GeminiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
