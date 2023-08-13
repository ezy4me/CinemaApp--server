import { IsNumber, IsString } from 'class-validator';

export class HallStatusDto {
  @IsString()
  name: string;

  @IsNumber()
  multiplier: number;
}
