// dto/filter-movies.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class FilterMoviesDto {
  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  actor?: string;
}
