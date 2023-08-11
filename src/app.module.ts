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

@Module({
  imports: [DatabaseModule, UsersModule, LoyaltyModule, MoviesModule, HallsModule, TicketsModule, SessionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
