import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AdminGuard } from './adm.guard';

@Injectable()
export class JwtAdminGuard implements CanActivate {
  constructor(private jwtAuthGuard: JwtAuthGuard, private adminGuard: AdminGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const jwtCanActivate = await this.jwtAuthGuard.canActivate(context);
    console.log(context)
    if (!jwtCanActivate) {
      return false;
    }

    return this.adminGuard.canActivate(context);
  }
}
