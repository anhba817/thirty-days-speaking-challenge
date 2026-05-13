import { ArrayMaxSize, IsArray, IsInt } from 'class-validator';

export class MergeProgressDto {
  @IsArray()
  @ArrayMaxSize(60)
  @IsInt({ each: true })
  dayIds!: number[];
}
