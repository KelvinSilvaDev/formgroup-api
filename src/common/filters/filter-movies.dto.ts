// dto/filter-movies.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterMoviesDto {
  @ApiPropertyOptional({
    description: 'Filtrar filmes pelo nome do diretor.',
    example: 'Steven Spielberg',
  })
  @IsOptional()
  @IsString()
  director?: string;

  @ApiPropertyOptional({
    description: 'Filtrar filmes pelo título.',
    example: 'Titanic',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filtrar filmes pelo nome do gênero.',
    example: 'Drama',
  })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiPropertyOptional({
    description: 'Filtrar filmes pelo nome do ator.',
    example: 'Leonardo DiCaprio',
  })
  @IsOptional()
  @IsString()
  actor?: string;
}
