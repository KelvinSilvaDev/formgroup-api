import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from '../models/UserFromJwt';
import { UserPayload } from '../models/UserPayload';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  // async validate(payload: any) {
  //   const user = await this.usersService.findByEmail(payload.email)
  //   if(!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    return await this.usersService.findOne(payload.sub);  
    // return {
    //   id: payload.sub,
    //   email: payload.email,
    //   username: payload.username,
    //   role: payload.role
    // };
  }

}
