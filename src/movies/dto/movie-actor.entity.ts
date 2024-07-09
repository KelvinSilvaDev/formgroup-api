import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '../entities/movie.entity';
import { Actor } from '../entities/actor.entity';

export class MovieActor {
  @ApiProperty()
  movieId: number;

  @ApiProperty()
  actorId: number;

  @ApiProperty({ type: Movie })
  movie: Movie;

  @ApiProperty({ type: Actor })
  actor: Actor;
}
