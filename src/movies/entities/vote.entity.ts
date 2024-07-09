import { ApiProperty } from '@nestjs/swagger';
import { Movie } from './movie.entity';

export class Vote {
  @ApiProperty()
  id: number;

  @ApiProperty()
  value: number;

  @ApiProperty()
  movieId: number;

  @ApiProperty({ type: Movie })
  movie: Movie;
}
