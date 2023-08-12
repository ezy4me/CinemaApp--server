import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
  id: number;
  email: string;

  @Exclude()
  password: string;

  firstName: string;
  lastName: string;
  gender: string;
  birthday: Date;
  phone: string;
  roleId: number;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
