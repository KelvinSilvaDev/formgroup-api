import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';

import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  // imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), MoviesModule],
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MoviesModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
