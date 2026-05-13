import {
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

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
}
