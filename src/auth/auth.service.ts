// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { UsersService } from '../users/users.service';
// import { UserPayload } from './models/UserPayload';
// import { User } from 'src/users/entities/user.entity';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly userService: UsersService,
//     private readonly jwtService: JwtService,
//   ) {}

// async validateUser(emailOrUsername: string, pass: string): Promise<any> {
//   const user = await this.userService.findUserByEmail(emailOrUsername)
//               || await this.userService.findUserByUsername(emailOrUsername);
//   if (user && await bcrypt.compare(pass, user.password)) {
//     const { password, ...result } = user;
//     return result;
//   }
//   return null;
// }

// async login(user: UserPayload) {
//   const payload = { email: user.email, sub: user.id };
//   return {
//     access_token: this.jwtService.sign(payload),
//   };
// }

// async validateUser(username: string, pass: string): Promise<any> {
//   const user = await this.userService.findByUsername(username);
//   if (user && await bcrypt.compare(pass, user.password)) {
//     const { password, ...result } = user;
//     return result;
//   }
//   return null;
// }

// async login(user: any) {
//   const payload = { username: user.username, sub: user.id, role: user.role };
//   return {
//     access_token: this.jwtService.sign(payload),
//   };
// }

// async login(user: any) {
//   const payload = {
//     sub: user.id,
//     email: user.email,
//     role: user.role,
//   };

//   const jwtToken = this.jwtService.sign(payload);
//   console.log('Generated JWT Token:', jwtToken);  // Verifica o token gerado

//   return {
//     username: user.username,
//     email: user.email,
//     access_token: jwtToken,
//   };
// }

// async validateUser(email: string, password: string) {
//   const user = await this.userService.findByEmail(email);
//   if (user) {
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (isPasswordValid) {
//       return {
//         ...user,
//         password: undefined,
//       };
//     }
//   }
//   throw new Error('Invalid email or password');
// }
// }

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
    const jwtToken = await this.jwtService.signAsync(payload);

    return {
      user: user.username,
      email: user.email,
      access_token: jwtToken,
      role: user.role,
    };
  }

  // login(user: User): UserToken {
  //   const payload: UserPayload = {
  //     sub: user._id,
  //     email: user.email,
  //     username: user.username,
  //     role: user.role,
  //   };

  //   const jwtToken = this.jwtService.sign(payload);

  //   return {
  //     user: user.username,
  //     email: user.email,
  //     access_token: jwtToken,
  //   };
  // }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('Invalid email or password');
  }
}
