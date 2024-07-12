import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { VoteMovieDto } from './dto/vote-movie.dto';
import { Movie, Vote } from '@prisma/client';
import { FilterMoviesDto } from 'src/common/filters/filter-movies.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.prisma.$transaction(async (prisma) => {
      let director: { id: number; name: string };
      let genre: { id: number; name: string };

      // Verificar ou criar o diretor
      if (createMovieDto.directorId) {
        // Verifica se o diretor já existe com base no ID
        director = await prisma.director.findUnique({
          where: { id: createMovieDto.directorId },
        });
        if (!director) {
          throw new Error('Director with this ID does not exist.');
        }
      } else if (createMovieDto.directorName) {
        // Verifica se o diretor já existe com base no nome
        director = await prisma.director.findUnique({
          where: { name: createMovieDto.directorName },
        });
        if (!director) {
          // Se não existir, cria um novo diretor
          director = await prisma.director.create({
            data: { name: createMovieDto.directorName },
          });
        }
      } else {
        throw new Error('Either directorId or directorName must be provided.');
      }

      // Verificar ou criar o gênero
      if (createMovieDto.genreId) {
        // Verifica se o gênero já existe com base no ID
        genre = await prisma.genre.findUnique({
          where: { id: createMovieDto.genreId },
        });
        if (!genre) {
          throw new Error('Genre with this ID does not exist.');
        }
      } else if (createMovieDto.genreName) {
        // Verifica se o gênero já existe com base no nome
        genre = await prisma.genre.findUnique({
          where: { name: createMovieDto.genreName },
        });
        if (!genre) {
          // Se não existir, cria um novo gênero
          genre = await prisma.genre.create({
            data: { name: createMovieDto.genreName },
          });
        }
      } else {
        throw new Error('Either genreId or genreName must be provided.');
      }

      // Verificar se o filme já existe
      const existingMovie = await prisma.movie.findUnique({
        where: { title: createMovieDto.title },
      });
      if (existingMovie) {
        throw new UnauthorizedException(
          'Movie with this title already exists.',
        );
      }

      // Criar o filme
      return prisma.movie.create({
        data: {
          title: createMovieDto.title,
          description: createMovieDto.description,
          releaseDate: createMovieDto.releaseDate,
          photoUrl: createMovieDto.photoUrl,
          director: { connect: { id: director.id } },
          genre: { connect: { id: genre.id } },
          isActive: createMovieDto.isActive,
        },
      });
    });
  }

  async findAll(): Promise<Movie[]> {
    return this.prisma.movie.findMany({
      where: {
        isActive: true,
      },
      include: {
        votes: true,
        movieActors: true,
      },
    });
  }

  async findOne(id: number): Promise<Movie> {
    return this.prisma.movie.findUnique({
      where: {
        id,
        isActive: true,
      },
      include: {
        votes: true,
        movieActors: true,
      },
    });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return this.prisma.movie.update({
      where: { id },
      data: {
        title: updateMovieDto.title,
        description: updateMovieDto.description,
        releaseDate: updateMovieDto.releaseDate,
        director: updateMovieDto.directorId
          ? { connect: { id: updateMovieDto.directorId } }
          : undefined,
        genre: updateMovieDto.genreId
          ? { connect: { id: updateMovieDto.genreId } }
          : undefined,
        isActive: updateMovieDto.isActive,
      },
    });
  }

  async remove(id: number): Promise<Movie> {
    return this.prisma.movie.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }

  async vote(
    movieId: number,
    voteMovieDto: VoteMovieDto,
  ): Promise<{ status: string; message: string; data?: Vote }> {
    const voteExists = await this.prisma.vote.findFirst({
      where: {
        userId: voteMovieDto.userId,
        movieId,
        score: voteMovieDto.vote,
      },
    });

    if (voteExists) {
      throw new HttpException(
        'Voto já realizado com a mesma pontuação',
        HttpStatus.CONFLICT,
      );
    }

    const voteUpdating = await this.prisma.vote.findFirst({
      where: {
        userId: voteMovieDto.userId,
        movieId,
      },
    });

    if (voteUpdating) {
      const updatedVote = await this.prisma.vote.update({
        where: { id: voteUpdating.id },
        data: {
          score: voteMovieDto.vote,
        },
      });
      return {
        status: 'success',
        message: 'Voto atualizado com sucesso',
        data: updatedVote,
      };
    }

    const newVote = await this.prisma.vote.create({
      data: {
        score: voteMovieDto.vote,
        user: { connect: { id: voteMovieDto.userId } },
        movie: { connect: { id: movieId } },
      },
    });

    return {
      status: 'success',
      message: 'Voto registrado com sucesso',
      data: newVote,
    };
  }

  async getMovies(
    filters: FilterMoviesDto,
    page: number = 1,
    pageSize: number = 10,
  ) {
    const { director, name, genre, actor } = filters;

    const where: any = {
      AND: [],
    };

    if (director) {
      where.AND.push({
        director: {
          name: {
            contains: director,
            mode: 'insensitive',
          },
        },
      });
    }

    if (name) {
      where.AND.push({
        title: {
          contains: name,
          mode: 'insensitive',
        },
      });
    }

    if (genre) {
      where.AND.push({
        genre: {
          name: {
            contains: genre,
            mode: 'insensitive',
          },
        },
      });
    }

    if (actor) {
      where.AND.push({
        movieActors: {
          some: {
            actor: {
              name: {
                contains: actor,
                mode: 'insensitive',
              },
            },
          },
        },
      });
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const movies = await this.prisma.movie.findMany({
      where: where.AND.length > 0 ? where : undefined,
      skip,
      take,
      include: {
        director: true,
        genre: true,
        movieActors: {
          include: {
            actor: true,
          },
        },
      },
    });

    const totalMovies = await this.prisma.movie.count({
      where: where.AND.length > 0 ? where : undefined,
    });

    return {
      movies: movies.map((movie) => ({
        ...movie,
        actors: movie.movieActors.map((ma) => ma.actor),
      })),
      total: totalMovies,
      page,
      pageSize,
    };
  }

  // async getMovies(filters: FilterMoviesDto) {
  //   const { director, name, genre, actor } = filters;

  //   const where: any = {
  //     AND: [],
  //   };

  //   if (director) {
  //     where.AND.push({
  //       director: {
  //         name: {
  //           contains: director,
  //           mode: 'insensitive',
  //         },
  //       },
  //     });
  //   }

  //   if (name) {
  //     where.AND.push({
  //       title: {
  //         contains: name,
  //         mode: 'insensitive',
  //       },
  //     });
  //   }

  //   if (genre) {
  //     where.AND.push({
  //       genre: {
  //         name: {
  //           contains: genre,
  //           mode: 'insensitive',
  //         },
  //       },
  //     });
  //   }

  //   if (actor) {
  //     where.AND.push({
  //       movieActors: {
  //         some: {
  //           actor: {
  //             name: {
  //               contains: actor,
  //               mode: 'insensitive',
  //             },
  //           },
  //         },
  //       },
  //     });
  //   }

  //   const movies = await this.prisma.movie.findMany({
  //     where,
  //     include: {
  //       director: true,
  //       genre: true,
  //       movieActors: {
  //         include: {
  //           actor: true,
  //         },
  //       },
  //     },
  //   });

  //   return movies.map((movie) => ({
  //     ...movie,
  //     actors: movie.movieActors.map((ma) => ma.actor),
  //   }));
  // }

  // async getMovies(filters: FilterMoviesDto) {
  //   const { director, name, genre, actor } = filters;

  //   const where: any = {
  //     AND: [],
  //   };

  //   if (director) {
  //     where.AND.push({
  //       director: {
  //         name: {
  //           contains: director,
  //           mode: 'insensitive',
  //         },
  //       },
  //     });
  //   }

  //   if (name) {
  //     where.AND.push({
  //       title: {
  //         contains: name,
  //         mode: 'insensitive',
  //       },
  //     });
  //   }

  //   if (genre) {
  //     where.AND.push({
  //       genre: {
  //         name: {
  //           contains: genre,
  //           mode: 'insensitive',
  //         },
  //       },
  //     });
  //   }

  //   if (actor) {
  //     where.AND.push({
  //       movieActors: {
  //         some: {
  //           actor: {
  //             name: {
  //               contains: actor,
  //               mode: 'insensitive',
  //             },
  //           },
  //         },
  //       },
  //     });
  //   }

  //   const movies = await this.prisma.movie.findMany({
  //     where: where.AND.length > 0 ? where : undefined,
  //     include: {
  //       director: true,
  //       genre: true,
  //       movieActors: {
  //         include: {
  //           actor: true,
  //         },
  //       },
  //     },
  //   });

  //   return movies.map((movie) => ({
  //     ...movie,
  //     actors: movie.movieActors.map((ma) => ma.actor),
  //   }));
  // }

  // async getMovies(filters: FilterMoviesDto) {
  //   const { director, name, genre, actor } = filters;

  //   const where: any = {
  //     AND: [],
  //   };

  //   if (director) {
  //     where.AND.push({
  //       director: {
  //         name: {
  //           contains: director,
  //           mode: 'insensitive',
  //         },
  //       },
  //     });
  //   }

  //   if (name) {
  //     where.AND.push({
  //       title: {
  //         contains: name,
  //         mode: 'insensitive',
  //       },
  //     });
  //   }

  //   if (genre) {
  //     where.AND.push({
  //       genre: {
  //         name: {
  //           contains: genre,
  //           mode: 'insensitive',
  //         },
  //       },
  //     });
  //   }

  //   if (actor) {
  //     where.AND.push({
  //       movieActors: {
  //         some: {
  //           actor: {
  //             name: {
  //               contains: actor,
  //               mode: 'insensitive',
  //             },
  //           },
  //         },
  //       },
  //     });
  //   }

  //   const movies = await this.prisma.movie.findMany({
  //     where: where.AND.length > 0 ? where : undefined,
  //     include: {
  //       director: true,
  //       genre: true,
  //       movieActors: {
  //         include: {
  //           actor: true,
  //         },
  //       },
  //     },
  //   });

  //   return movies.map((movie) => ({
  //     ...movie,
  //     actors: movie.movieActors.map((ma) => ma.actor),
  //   }));
  // }

  // async vote(movieId: number, voteMovieDto: VoteMovieDto): Promise<void> {
  //   const voteExists = await this.prisma.vote.findFirst({
  //     where: {
  //       userId: voteMovieDto.userId,
  //       movieId,
  //       score: voteMovieDto.vote,
  //     },
  //   });

  //   if (voteExists) {
  //     throw new UnauthorizedException('Voto já realizado');
  //   }

  //   const voteUpdating = await this.prisma.vote.findFirst({
  //     where: {
  //       userId: voteMovieDto.userId,
  //       movieId,
  //     },
  //   });

  //   if (voteUpdating) {
  //     await this.prisma.vote.update({
  //       where: { id: voteUpdating.id },
  //       data: {
  //         score: voteMovieDto.vote,
  //       },
  //     });
  //   }

  //   await this.prisma.vote.create({
  //     data: {
  //       score: voteMovieDto.vote,
  //       user: { connect: { id: voteMovieDto.userId } },
  //       movie: { connect: { id: movieId } },
  //     },
  //   });
  // }
}
