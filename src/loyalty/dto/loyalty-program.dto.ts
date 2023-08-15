import { IsNumber, IsString } from 'class-validator';

export class LoyaltyProgramDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  requiredBalance: number;

  @IsNumber()
  discount: number;
}
