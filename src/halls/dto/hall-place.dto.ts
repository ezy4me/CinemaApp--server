import { IsNumber } from 'class-validator';

export class HallPlaceDto {
  @IsNumber()
  rowNumber: number;

  @IsNumber()
  seatNumber: number;

  @IsNumber()
  hallId: number;
}
