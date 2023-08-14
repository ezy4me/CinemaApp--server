import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MovieCountryService } from './movie-country/movie-country.service';
import { MovieCountryController } from './movie-country/movie-country.controller';
import { DatabaseService } from 'src/database/database.service';
import { MovieGenreService } from './movie-gnere/movie-genre.service';
import { MovieGenreController } from './movie-gnere/movie-genre.controller';
import { MovieAgeRatingService } from './movie-age-rating/movie-age-rating.service';
import { MovieAgeRatingController } from './movie-age-rating/movie-age-rating.controller';

@Module({
  providers: [
    MoviesService,
    MovieCountryService,
    MovieGenreService,
    MovieAgeRatingService,
    DatabaseService,
  ],
  controllers: [
    MoviesController,
    MovieCountryController,
    MovieGenreController,
    MovieAgeRatingController,
  ],
})
export class MoviesModule {}
