import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CurrentUserDto } from '../dto/current-user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    console.log('Required roles:', requiredRoles);
    console.log('Headers :', context.switchToHttp().getRequest().headers)
    const { authorization } = context.switchToHttp().getRequest().headers

    console.log('Authorization', authorization)

    const token = authorization.replace('Bearer ', '');

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('Request :', request)
    console.log('User :', user)


    // const userPayload: CurrentUserDto | undefined = await this.jwtService.verify(authorization, { secret: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSJ9.nLQi-i-p8XX72uNiDTwXjg_NCyMy8fRuY8sQG7npR9Q' }).catch(() => undefined)

    let userPayload: CurrentUserDto;

    try {
      userPayload = await this.jwtService.verifyAsync(token);
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException('Invalid or expired token');
    }


    console.log('adsasda', userPayload)

    if (!userPayload) {
      return false
    }




    // console.log('User in request:', user);

    // if (!user) {
    //   throw new UnauthorizedException('User not found');
    // }

    // return isAdmin
    // const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => role === userPayload.role);
  }

}
