import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(user: Partial<User>) {
    const hashedPassword = this.hashPassword(user.password);
    return this.databaseService.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        birthday: user.birthday,
        phone: user.phone,
        roleId: user.roleId,
      },
    });
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findOne(email: string): Promise<User | null> {
    return this.databaseService.user.findUnique({
      where: { email },
    });
  }

  async delete(id: number) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(2));
  }
}
