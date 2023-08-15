import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class MovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  movieCountryId: number;

  @IsNumber()
  movieGenreId: number;

  @IsNumber()
  movieAgeRatingId: number;
}
