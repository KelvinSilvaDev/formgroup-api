import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { VoteMovieDto } from './dto/vote-movie.dto';
import { Prisma, Movie } from '@prisma/client';


@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) { }


  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.prisma.$transaction(async (prisma) => {
      let director;
      let genre;
  
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
  
      // Criar o filme
      return prisma.movie.create({
        data: {
          title: createMovieDto.title,
          description: createMovieDto.description,
          releaseDate: createMovieDto.releaseDate,
          director: { connect: { id: director.id } },
          genre: { connect: { id: genre.id } },
          isActive: createMovieDto.isActive,
        },
      });
    });
  }
  

  // async create(createMovieDto: CreateMovieDto): Promise<Movie> {
  //   return this.prisma.$transaction(async (prisma) => {
  //     // Verificar ou criar o diretor
  //     let director = await prisma.director.findFirst({
  //       where: { name: createMovieDto.directorName },
  //     });
  
  //     // Se o diretor não existir, cria um novo
  //     if (!director) {
  //       director = await prisma.director.create({
  //         data: {
  //           name: createMovieDto.directorName,  // Adicionando o nome do diretor
  //         },
  //       });
  //     }
  
  //     // Verificar ou criar o gênero
  //     let genre = await prisma.genre.findFirst({
  //       where: { name: createMovieDto.genreName },
  //     });
  
  //     // Se o gênero não existir, cria um novo
  //     if (!genre) {
  //       genre = await prisma.genre.create({
  //         data: {
  //           name: createMovieDto.genreName,  // Adicionando o nome do gênero
  //         },
  //       });
  //     }
  
  //     // Criar o filme
  //     return prisma.movie.create({
  //       data: {
  //         title: createMovieDto.title,
  //         description: createMovieDto.description,
  //         releaseDate: createMovieDto.releaseDate,
  //         director: { connect: { id: director.id } },
  //         genre: { connect: { id: genre.id } },
  //         isActive: createMovieDto.isActive,
  //       },
  //     });
  //   });
  // }
  
  
  

  // async create(createMovieDto: CreateMovieDto): Promise<Movie> {
  //   return this.prisma.$transaction(async (prisma) => {
  //     // Verificar se o diretor existe pelo nome
  //     let director = await prisma.director.findFirst({
  //       where: { name: createMovieDto.directorName },
  //     });
  
  //     // Se o diretor não existir, cria um novo
  //     if (!director) {
  //       director = await prisma.director.create({
  //         data: {
  //           name: createMovieDto.directorName,
  //         },
  //       });
  //     }
  
  //     // Verificar se o gênero existe pelo nome
  //     let genre = await prisma.genre.findFirst({
  //       where: { name: createMovieDto.genreName },
  //     });
  
  //     // Se o gênero não existir, cria um novo
  //     if (!genre) {
  //       genre = await prisma.genre.create({
  //         data: {
  //           name: createMovieDto.genreName,
  //         },
  //       });
  //     }
  
  //     // Criar o filme
  //     return prisma.movie.create({
  //       data: {
  //         title: createMovieDto.title,
  //         description: createMovieDto.description,
  //         releaseDate: createMovieDto.releaseDate,
  //         director: { connect: { id: director.id } },
  //         genre: { connect: { id: genre.id } },
  //         isActive: createMovieDto.isActive,
  //       },
  //     });
  //   });
  // }
  
  
  
  
  

  // async create(createMovieDto: CreateMovieDto): Promise<Movie> {
  //   return this.prisma.$transaction(async (prisma) => {
  //     // Verificar ou criar o diretor
  //     const director = await prisma.director.upsert({
  //       where: { id: createMovieDto.directorId },
  //       update: {},  // Não atualiza nada, apenas garante que o diretor existe
  //       create: {
  //         id: createMovieDto.directorId,
  //         name: createMovieDto.directorName,  // Adicionando o nome do diretor
  //       },
  //     });
  
  //     // Verificar ou criar o gênero
  //     const genre = await prisma.genre.upsert({
  //       where: { id: createMovieDto.genreId },
  //       update: {},  // Não atualiza nada, apenas garante que o gênero existe
  //       create: {
  //         id: createMovieDto.genreId,
  //         name: createMovieDto.genreName,  // Adicionando o nome do gênero
  //       },
  //     });
  
  //     // Criar o filme
  //     return prisma.movie.create({
  //       data: {
  //         title: createMovieDto.title,
  //         description: createMovieDto.description,
  //         releaseDate: createMovieDto.releaseDate,
  //         director: { connect: { id: director.id } },
  //         genre: { connect: { id: genre.id } },
  //         isActive: createMovieDto.isActive,
  //       },
  //     });
  //   });
  // }
  



  // async create(createMovieDto: CreateMovieDto): Promise<Movie> {
  //   return this.prisma.movie.create({
  //     data: {
  //       title: createMovieDto.title,
  //       description: createMovieDto.description,
  //       releaseDate: createMovieDto.releaseDate,
  //       director: createMovieDto.directorId ? { connect: { id: createMovieDto.directorId } } : undefined,
  //       genre: createMovieDto.genreId ? { connect: { id: createMovieDto.genreId } } : undefined,
  //       isActive: createMovieDto.isActive,
  //     },
  //   });
  // }




  async findAll(): Promise<Movie[]> {
    return this.prisma.movie.findMany({
      include: {
        votes: true,
        movieActors: true,
      },
    });
  }


  async findOne(id: number): Promise<Movie> {
    return this.prisma.movie.findUnique({
      where: { id },
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
        director: updateMovieDto.directorId ? { connect: { id: updateMovieDto.directorId } } : undefined,
        genre: updateMovieDto.genreId ? { connect: { id: updateMovieDto.genreId } } : undefined,
        isActive: updateMovieDto.isActive,
      },
    });
  }

  async remove(id: number): Promise<Movie> {
    return this.prisma.movie.delete({
      where: { id },
    });
  }

  async vote(movieId: number, voteMovieDto: VoteMovieDto): Promise<void> {
    await this.prisma.vote.create({
      data: {
        score: voteMovieDto.vote,
        user: { connect: { id: voteMovieDto.userId } },
        movie: { connect: { id: movieId } },
      },
    });
  }






  // async create(createMovieDto: CreateMovieDto): Promise<Movie> {

  //   const movie = createMovieDto
  //   const newMovie = await this.prisma.movie.create({
  //     data: {
  //       title: movie.title,
  //       description: movie.description,
  //       releaseDate: movie.releaseDate,
  //     },
  //     include: {
  //       votes: movie.votes
  //     }
  //   })

  //   return newMovie

  // const { directorId, genreId, actors, ...data } = createMovieDto;

  // const movie = await this.prisma.movie.create({
  //   data: {
  //     ...data,
  //     director: directorId ? { connect: { id: directorId } } : undefined,
  //     genre: genreId ? { connect: { id: genreId } } : undefined,
  //     movieActors: actors ? { create: actors.map(actorId => ({ actor: { connect: { id: actorId } } })) } : undefined,
  //   },
  //   include: {
  //     director: true,
  //     genre: true,
  //     movieActors: {
  //       include: {
  //         actor: true,
  //       },
  //     },
  //   },
  // });

  // const averageVote = movie.votes.length > 0 ? movie.votes.reduce((acc, vote) => acc + vote.value, 0) / movie.votes.length : 0;

  // return {
  //   ...movie,
  //   actors: movie.movieActors.map(ma => ma.actor),
  //   averageVote,
  // };
  // }



  // async findAll(): Promise<Movie[]> {
  //   return this.prisma.movie.findMany({ where: { isActive: true } });
  // }

  // async findOne(id: number): Promise<Movie> {
  //   const movie = await this.prisma.movie.findUnique({ where: { id } });
  //   if (!movie || !movie.isActive) {
  //     throw new NotFoundException(`Movie with ID ${id} not found`);
  //   }
  //   return movie;
  // }

  // async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
  //   const movie = await this.prisma.movie.findUnique({ where: { id } });
  //   if (!movie || !movie.isActive) {
  //     throw new NotFoundException(`Movie with ID ${id} not found`);
  //   }
  //   return this.prisma.movie.update({ where: { id }, data: updateMovieDto });
  // }

  // async remove(id: number): Promise<Movie> {
  //   const movie = await this.prisma.movie.findUnique({ where: { id } });
  //   if (!movie || !movie.isActive) {
  //     throw new NotFoundException(`Movie with ID ${id} not found`);
  //   }
  //   return this.prisma.movie.update({ where: { id }, data: { isActive: false } });
  // }

  // async vote(id: number, voteMovieDto: VoteMovieDto): Promise<Movie> {
  //   const movie = await this.prisma.movie.findUnique({
  //     where: { id },
  //     include: { votes: true },
  //   });
  //   if (!movie || !movie.isActive) {
  //     throw new NotFoundException(`Movie with ID ${id} not found`);
  //   }
  //   const newVote = await this.prisma.vote.create({
  //     data: {
  //       movieId: id,
  //       vote: voteMovieDto.vote,
  //     },
  //   });
  //   const updatedVotes = [...movie.votes, newVote.vote];
  //   const averageVote = updatedVotes.reduce((a, b) => a + b) / updatedVotes.length;
  //   return this.prisma.movie.update({
  //     where: { id },
  //     data: { votes: updatedVotes, averageVote },
  //   });
  // }


}
