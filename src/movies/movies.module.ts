import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MovieCountryService } from './movie-country/movie-country.service';
import { MovieCountryController } from './movie-country/movie-country.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [MoviesService, MovieCountryService, DatabaseService],
  controllers: [MoviesController, MovieCountryController],
})
export class MoviesModule {}
