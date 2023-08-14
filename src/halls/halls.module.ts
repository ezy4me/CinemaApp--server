import { Module } from '@nestjs/common';
import { HallsService } from './halls.service';
import { HallsController } from './halls.controller';
import { DatabaseService } from 'src/database/database.service';
import { HallStatusesController } from './hall-status/hall-statuses.controller';
import { HallStatusesService } from './hall-status/hall-statuses.service';
import { CinemaService } from './cinema/cinema.service';
import { CinemaController } from './cinema/cinema.controller';

@Module({
  providers: [
    HallsService,
    HallStatusesService,
    CinemaService,
    DatabaseService,
  ],
  controllers: [HallsController, HallStatusesController, CinemaController],
})
export class HallsModule {}
