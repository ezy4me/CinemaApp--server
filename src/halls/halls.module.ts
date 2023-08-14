import { Module } from '@nestjs/common';
import { HallsService } from './halls.service';
import { HallsController } from './halls.controller';
import { DatabaseService } from 'src/database/database.service';
import { HallStatusesController } from './hall-status/hall-statuses.controller';
import { HallStatusesService } from './hall-status/hall-statuses.service';
import { CinemaService } from './cinema/cinema.service';
import { CinemaController } from './cinema/cinema.controller';
import { HallPlaceService } from './hall-place/hall-place.service';
import { HallPlaceController } from './hall-place/hall-place.controller';

@Module({
  providers: [
    HallsService,
    HallStatusesService,
    CinemaService,
    DatabaseService,
    HallPlaceService,
  ],
  controllers: [
    HallsController,
    HallStatusesController,
    CinemaController,
    HallPlaceController,
  ],
})
export class HallsModule {}
