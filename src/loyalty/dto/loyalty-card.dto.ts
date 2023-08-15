import { IsNumber, IsString } from 'class-validator';

export class LoyaltyCardDto {
  @IsString()
  number: string;

  @IsNumber()
  balance: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  loyaltyProgramId: number;
}
