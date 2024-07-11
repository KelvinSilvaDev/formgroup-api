import { ApiProperty } from '@nestjs/swagger';
import { MovieActor } from '../dto/movie-actor.entity';

export class Actor {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [MovieActor] })
  movieActors: MovieActor[];
}
