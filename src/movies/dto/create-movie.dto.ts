// src/movies/dto/create-movie.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsDate, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { Vote } from '../entities/vote.entity';

export class CreateMovieDto {
    @IsString()
    title: string;
  
    @IsString()
    description: string;
  
    @IsDate()
    releaseDate: Date;
  
    @IsOptional()
    @IsInt()
    directorId?: number;

    directorName?: string;

  
    @IsOptional()
    @IsInt()
    genreId?: number;

    genreName?: string;

    
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
  
}
