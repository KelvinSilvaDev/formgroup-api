import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Roles } from '../common/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VoteMovieDto } from './dto/vote-movie.dto';
// import { isPublic } from 'src/auth/decorators/is-public.decorator';
import { Role } from 'src/common/roles.enum';
import { AdminGuard } from 'src/auth/admin.guard';
import { FilterMoviesDto } from 'src/common/filters/filter-movies.dto';
import { Movie } from './entities/movie.entity';
// import { IsAdmin } from './decorators/is-admin.decorator';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { AdminGuard } from 'src/auth/guards/adm.guard';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo filme' })
  @ApiBody({
    type: CreateMovieDto,
    examples: {
      default: {
        summary: 'Exemplo com Nome do Diretor e Gênero',
        value: {
          title: 'Inception',
          description:
            'A thief who steals corporate secrets through the use of dream-sharing technology is given a final chance at redemption.',
          releaseDate: '2010-07-16T00:00:00.000Z',
          directorName: 'Christopher Nolan',
          genreName: 'Science Fiction',
          isActive: true,
        },
      },
      withId: {
        summary: 'Exemplo com ID do Diretor e Gênero',
        value: {
          title: 'The Dark Knight',
          description:
            'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
          releaseDate: '2008-07-18T00:00:00.000Z',
          directorId: 1,
          genreId: 2,
          isActive: true,
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Filme criado com sucesso.' })
  @ApiResponse({
    status: 403,
    description: 'Apenas administradores podem cadastrar filmes.',
  })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obter uma lista de filmes com filtros, paginação e ordenação.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de filmes com base nos filtros aplicados.',
    type: [Movie], // Defina o tipo da resposta conforme sua estrutura
  })
  @ApiQuery({
    name: 'director',
    description: 'Filtrar filmes pelo nome do diretor.',
    example: 'Steven Spielberg',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'name',
    description: 'Filtrar filmes pelo título.',
    example: 'Titanic',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'genre',
    description: 'Filtrar filmes pelo nome do gênero.',
    example: 'Drama',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'actor',
    description: 'Filtrar filmes pelo nome do ator.',
    example: 'Leonardo DiCaprio',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'page',
    description: 'Número da página para paginação.',
    example: 1,
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    description: 'Número de filmes por página.',
    example: 10,
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'sortBy',
    description: 'Campo pelo qual os filmes serão ordenados.',
    example: 'releaseDate',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'order',
    description: 'Ordem da ordenação dos filmes.',
    example: 'asc',
    required: false,
    enum: ['asc', 'desc'],
  })
  async getMovies(
    @Query() filters: FilterMoviesDto,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
    @Query('sortBy') sortBy?: string,
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const pageSizeNumber = parseInt(pageSize, 10) || 10;

    return await this.moviesService.getMovies(
      filters,
      pageNumber,
      pageSizeNumber,
      sortBy,
      order,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhar um filme' })
  @ApiParam({ name: 'id', description: 'ID do filme', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Detalhes do filme retornados com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Filme não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Atualizar um filme' })
  @ApiParam({ name: 'id', description: 'ID do filme', example: 1 })
  @ApiBody({ type: UpdateMovieDto })
  @ApiResponse({ status: 200, description: 'Filme atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Filme não encontrado.' })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Excluir logicamente um filme' })
  @ApiParam({ name: 'id', description: 'ID do filme', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Filme excluído logicamente com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Filme não encontrado.' })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }

  @Post(':id/vote')
  @ApiOperation({ summary: 'Votar em um filme' })
  @ApiParam({ name: 'id', description: 'ID do filme', example: 1 })
  @ApiBody({ type: VoteMovieDto })
  @ApiResponse({ status: 200, description: 'Voto registrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Filme não encontrado.' })
  vote(@Param('id') id: string, @Body() voteMovieDto: VoteMovieDto) {
    return this.moviesService.vote(+id, voteMovieDto);
  }
}
