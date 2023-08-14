import { IsNumber, IsString } from 'class-validator';
export class HallDto {
  @IsString()
  number: string;

  @IsNumber()
  capacity: number;

  @IsNumber()
  hallStatusId: number;

  @IsNumber()
  cinemaId: number;
}
