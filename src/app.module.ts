import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { MoviesModule } from './movies/movies.module';
import { HallsModule } from './halls/halls.module';
import { TicketsModule } from './tickets/tickets.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { ActorsModule } from './actors/actors.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    LoyaltyModule,
    MoviesModule,
    HallsModule,
    TicketsModule,
    SessionsModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ActorsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static/images',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
