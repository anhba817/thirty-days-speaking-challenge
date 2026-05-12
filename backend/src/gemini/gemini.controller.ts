import { Body, Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { FeedbackRequestDto, FeedbackResponse } from './dto/feedback.dto';
import {
  ExplanationRequestDto,
  ExplanationResponse,
} from './dto/explanation.dto';
import {
  TranslateKeywordsRequestDto,
  TranslateKeywordsResponse,
} from './dto/translate.dto';

@Controller('api/gemini')
export class GeminiController {
  constructor(private readonly gemini: GeminiService) {}

  @Post('feedback')
  feedback(@Body() body: FeedbackRequestDto): Promise<FeedbackResponse> {
    return this.gemini.getSpeakingFeedback(body);
  }

  @Post('explanation')
  async explanation(
    @Body() body: ExplanationRequestDto,
  ): Promise<ExplanationResponse> {
    const text = await this.gemini.getExampleExplanation(
      body.example,
      body.targetLanguage,
    );
    return { text };
  }

  @Post('translate-keywords')
  async translateKeywords(
    @Body() body: TranslateKeywordsRequestDto,
  ): Promise<TranslateKeywordsResponse> {
    const translations = await this.gemini.translateKeywords(
      body.keywords,
      body.targetLanguage,
    );
    return { translations };
  }
}
