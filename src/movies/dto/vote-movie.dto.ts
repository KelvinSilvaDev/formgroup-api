import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max } from 'class-validator';

export class VoteMovieDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(4)
  vote: number;

  @ApiProperty()
  @IsInt()
  userId: number;
}
