import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MovieCountryService } from './movie-country/movie-country.service';
import { MovieCountryController } from './movie-country/movie-country.controller';
import { DatabaseService } from 'src/database/database.service';
import { MovieGenreService } from './movie-gnere/movie-genre.service';
import { MovieGenreController } from './movie-gnere/movie-genre.controller';

@Module({
  providers: [
    MoviesService,
    MovieCountryService,
    MovieGenreService,
    DatabaseService,
  ],
  controllers: [MoviesController, MovieCountryController, MovieGenreController],
})
export class MoviesModule {}
