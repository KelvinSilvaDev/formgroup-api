import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';

@Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {}

export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      console.log('Route is public');
      return true;  // Permite acesso se for uma rota pública
    }

    const canActivate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    console.log('User in JWT Auth Guard:', request.user);  // Adicione isto para verificar o usuário

    console.log('USER IN JWT AUTH GUARD', request.user)

    if (typeof canActivate === 'boolean') {
      return canActivate;
    }

    const canActivatePromise = canActivate as unknown as Promise<boolean>;


    return canActivatePromise.catch((error) => {
      console.error('Error in JwtAuthGuard:', error);  // Adicione logs para capturar erros
      throw new UnauthorizedException();
    });

    

  }

}
