import { Module } from '@nestjs/common';
import { HallsService } from './halls.service';
import { HallsController } from './halls.controller';
import { DatabaseService } from 'src/database/database.service';
import { HallStatusesController } from './hall-statuses.controller';
import { HallStatusesService } from './hall-statuses.service';

@Module({
  providers: [HallsService, HallStatusesService, DatabaseService],
  controllers: [HallsController, HallStatusesController],
})
export class HallsModule {}
