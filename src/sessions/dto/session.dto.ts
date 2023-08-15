import { IsDate, IsNumber } from 'class-validator';

export class SessionDto {
  @IsDate()
  startTime: Date;

  @IsDate()
  date: Date;

  @IsNumber()
  movieId: number;

  @IsNumber()
  sessionTypeId: number;

  @IsNumber()
  hallId: number;
}
