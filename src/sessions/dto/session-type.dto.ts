import { IsDate, IsNumber, IsString } from 'class-validator';

export class SessionTypeDto {
  @IsString()
  name: string;

  @IsDate()
  startPointTime: Date;

  @IsDate()
  endPointTime: Date;

  @IsNumber()
  multiplier: number;
}
