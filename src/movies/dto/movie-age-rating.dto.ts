import { IsNumber, IsString } from 'class-validator';

export class MovieAgeRatingDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;
}
