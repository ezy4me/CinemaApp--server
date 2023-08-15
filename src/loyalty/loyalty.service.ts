import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LoyaltyCardDto } from './dto';
import { LoyaltyCard } from '@prisma/client';
import { LoyaltyProgramService } from './loyalty-program/loyalty-program.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LoyaltyService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly loyaltyProgramService: LoyaltyProgramService,
    private readonly userService: UsersService,
  ) {}

  async create(dto: LoyaltyCardDto): Promise<LoyaltyCard> {
    await this.loyaltyProgramService.findOneById(dto.loyaltyProgramId);
    await this.userService.findOneById(dto.userId);

    return this.databaseService.loyaltyCard.create({
      data: dto,
    });
  }

  async findAll(): Promise<LoyaltyCard[]> {
    return this.databaseService.loyaltyCard.findMany();
  }

  async findOneById(id: number): Promise<LoyaltyCard> {
    const card = await this.databaseService.loyaltyCard.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException(`Loyalty card with id ${id} not found`);
    }

    return card;
  }

  async delete(id: number): Promise<LoyaltyCard> {
    const card = await this.findOneById(id);

    if (card) {
      return this.databaseService.loyaltyCard.delete({
        where: { id },
      });
    }
  }

  async update(id: number, dto: LoyaltyCardDto): Promise<LoyaltyCard> {
    const card = await this.findOneById(id);

    await this.loyaltyProgramService.findOneById(dto.loyaltyProgramId);

    await this.userService.findOneById(dto.userId);

    if (card) {
      return this.databaseService.loyaltyCard.update({
        where: { id },
        data: dto,
      });
    }
  }
}
