import { ApiProperty } from '@nestjs/swagger';
import { Movie } from './movie.entity';

export class Actor {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: () => [Movie] })
  movies: Movie[];
}
