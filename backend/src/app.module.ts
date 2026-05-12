import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
        PORT: Joi.number().port().default(3001),
        FRONTEND_ORIGIN: Joi.string()
          .uri({ scheme: ['http', 'https'] })
          .default('http://localhost:3000'),
      }),
      validationOptions: { abortEarly: false },
    }),
    GeminiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
