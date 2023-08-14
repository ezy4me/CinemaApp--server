import { IsEmail, IsString } from 'class-validator';

export class CinemaDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsEmail()
  @IsString()
  email: string;
}
