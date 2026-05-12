import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class KeywordDto {
  @IsString()
  @MaxLength(200)
  word!: string;

  @IsString()
  @MaxLength(200)
  vietnamese!: string;

  @IsString()
  @MaxLength(500)
  example!: string;
}

export class TranslateKeywordsRequestDto {
  @IsArray()
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => KeywordDto)
  keywords!: KeywordDto[];

  @IsString()
  @MaxLength(50)
  targetLanguage!: string;
}

export interface TranslateKeywordsResponse {
  translations: string[];
}
