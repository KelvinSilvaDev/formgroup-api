import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ required: false })
    username?: string;
  
    @ApiProperty({ required: false })
    email?: string;
  
    @ApiProperty({ required: false })
    password?: string;
    
}
