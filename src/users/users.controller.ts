import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Cadastra um usuário',
    description: 'Este endpoint cadastra um usuário no banco de dados.',
  })
  @ApiBody({ type: CreateUserDto })
  // @ApiParam({
  //   name: 'username',
  //   description: 'Nome de usuário que deve ser usado para identificação',
  //   example: 'kelvinsilvadev',
  // })
  // @ApiParam({
  //   name: 'email',
  //   description: 'E-mail pelo qual o usuário irá se identificar na aplicação.',
  //   example: 'kelvinsilvadev@gmail.com'
  // })
  // @ApiParam({
  //   name: 'password',
  //   description: 'Senha pela qual o usuário irá se identificar na aplicação.',
  //   example: 'password'
  // })
  @IsPublic()
  @Post()
  create(@Req() @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @ApiOperation({
    summary: 'Lista todos os usuários',
    description: 'Este endpoint retorna uma lista de todos os usuários ativos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso.',
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Busca um usuário por ID',
    description:
      'Este endpoint retorna os detalhes de um usuário específico pelo ID.',
  })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: 1 })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza um usuário',
    description:
      'Este endpoint atualiza os dados de um usuário específico pelo ID.',
  })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: 1 })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Exclusão lógica de um usuário',
    description:
      'Este endpoint marca um usuário como inativo, em vez de removê-lo fisicamente.',
  })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Usuário excluído logicamente com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
