import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MoviesModule } from './movies/movies.module';
import { PrismaService } from './prisma/prisma.service';
import { AdminGuard } from './auth/guards/adm.guard';
import { JwtAdminGuard } from './auth/guards/jwt-admin.guard';

import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  // imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), MoviesModule],
  imports: [UsersModule, AuthModule, ConfigModule.forRoot(), MoviesModule, JwtModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
  ],
  // providers: [
  //   AppService,
  //   PrismaService,
  //   AdminGuard,
  //   {
  //     provide: APP_GUARD,
  //     useClass: JwtAdminGuard, // Usa o guard combinado
  //   },
  // ],
})
export class AppModule { }
