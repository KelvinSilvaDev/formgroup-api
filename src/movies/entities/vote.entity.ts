import { ApiProperty } from '@nestjs/swagger';
import { Movie } from './movie.entity';

export class Vote {
  @ApiProperty()
  id: number;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  userId: number;

  @ApiProperty({ type: () => Movie })
  movie: Movie;
}
