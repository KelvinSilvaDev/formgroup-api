import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';

@Injectable()
export class CombinedAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtAuthGuard: JwtAuthGuard,
    private readonly rolesGuard: RolesGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Primeiro, realiza a verificação de autenticação com JwtAuthGuard
    const jwtAuthResult = await this.jwtAuthGuard.canActivate(context);
    if (!jwtAuthResult) {
      return false;
    }

    // Depois, verifica a autorização com RolesGuard
    return this.rolesGuard.canActivate(context);
  }
}
