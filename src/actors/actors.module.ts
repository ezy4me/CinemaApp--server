import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [ActorsService, DatabaseService],
  controllers: [ActorsController],
})
export class ActorsModule {}
