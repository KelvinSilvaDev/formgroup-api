import { ApiProperty } from '@nestjs/swagger';
import { Director } from './director.entity';
import { Genre } from './genre.entity';
import { Actor } from './actor.entity';
import { Vote } from './vote.entity';

export class Movie {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  releaseDate: Date;

  @ApiProperty({ required: false, type: () => Director })
  director?: Director;

  @ApiProperty({ required: false, type: () => Genre })
  genre?: Genre;

  @ApiProperty({ type: () => [Actor], required: false })
  actors?: Actor[];

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({ type: () => [Vote] })
  votes: Vote[];

  @ApiProperty()
  averageVote: number;
}
