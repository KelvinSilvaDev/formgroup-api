import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'Nome do usuário',
        example: 'kelvinsilvadev',
    })
    username: string;
    @ApiProperty({
        description: 'E-mail do usuário',
        example: 'kelvinsilvadev@gmail.com'
    })
    email: string;
    @ApiProperty({
        description: 'Senha do usuário',
        example: 'password'
    })
    password: string;
}
