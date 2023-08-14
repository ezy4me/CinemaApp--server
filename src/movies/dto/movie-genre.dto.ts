import { IsString } from 'class-validator';

export class MovieGenreDto {
  @IsString()
  name: string;
}
