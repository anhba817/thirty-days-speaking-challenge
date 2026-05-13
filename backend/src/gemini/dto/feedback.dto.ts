import { IsArray, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export const SUPPORTED_AUDIO_MIME_TYPES = [
  'audio/webm',
  'audio/mp4',
  'audio/m4a',
  'audio/aac',
  'audio/wav',
  'audio/mpeg',
  'audio/ogg',
  'audio/flac',
] as const;

export type SupportedAudioMimeType = (typeof SUPPORTED_AUDIO_MIME_TYPES)[number];

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

  @IsOptional()
  @IsIn(SUPPORTED_AUDIO_MIME_TYPES as unknown as string[])
  audioMimeType?: SupportedAudioMimeType;
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
