import {
  IsBase64,
  IsIn,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { SUPPORTED_AUDIO_MIME_TYPES } from '../../gemini/dto/feedback.dto';

// Cap base64-encoded audio at ~15 MB (raw ~11 MB). Generous for IELTS-length
// answers; enough to reject obvious abuse.
const MAX_AUDIO_BASE64_BYTES = 15 * 1024 * 1024;

export class SaveAttemptDto {
  @IsInt()
  @Min(1)
  dayId!: number;

  @IsInt()
  @Min(0)
  questionIx!: number;

  @IsOptional()
  @IsString()
  @MaxLength(20_000)
  transcript?: string;

  @IsObject()
  feedback!: Record<string, unknown>;

  @IsNumber()
  @Min(0)
  @Max(9)
  score!: number;

  // audioBase64 + audioMimeType go together: either both present (and the
  // backend uploads to S3) or both absent.
  @ValidateIf((o) => o.audioBase64 !== undefined || o.audioMimeType !== undefined)
  @IsIn(SUPPORTED_AUDIO_MIME_TYPES as unknown as string[])
  audioMimeType?: string;

  @ValidateIf((o) => o.audioBase64 !== undefined || o.audioMimeType !== undefined)
  @IsBase64()
  @MaxLength(MAX_AUDIO_BASE64_BYTES)
  audioBase64?: string;
}
