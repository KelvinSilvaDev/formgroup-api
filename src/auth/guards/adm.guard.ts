import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_ADMIN_KEY } from '../decorators/is-admin.decorator';


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isAdminRoute = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!isAdminRoute) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Supondo que você tenha o usuário no request via JwtAuthGuard

    console.log('User:', user); 

    return user && user.role === 'ADMIN';
  }
}
