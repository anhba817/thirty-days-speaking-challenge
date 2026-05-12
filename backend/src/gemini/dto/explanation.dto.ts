import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ExplanationRequestDto {
  @IsString()
  @MaxLength(5000)
  example!: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  targetLanguage?: string;
}

export interface ExplanationResponse {
  text: string;
}
