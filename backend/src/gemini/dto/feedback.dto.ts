import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

export class FeedbackRequestDto {
  @IsString()
  @MaxLength(500)
  topicTitle!: string;

  @IsString()
  @MaxLength(2000)
  question!: string;

  @IsString()
  @MaxLength(10000)
  userSpeech!: string;

  @IsArray()
  @IsString({ each: true })
  keywords!: string[];

  @IsOptional()
  @IsString()
  audioBase64?: string;
}

export interface FeedbackResponse {
  score: number;
  userTranscript?: string;
  fluencyFeedback: string;
  vocabularyFeedback: string;
  structureFeedback: string;
  sampleAnswer: string;
  vietnameseTips: string;
}
