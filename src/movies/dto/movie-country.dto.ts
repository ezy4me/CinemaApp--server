import { IsString } from 'class-validator';

export class MovieCountryDto {
  @IsString()
  name: string;
}
