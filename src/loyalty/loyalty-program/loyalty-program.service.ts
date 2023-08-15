import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LoyaltyProgramDto } from '../dto';
import { LoyaltyProgram } from '@prisma/client';

@Injectable()
export class LoyaltyProgramService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: LoyaltyProgramDto): Promise<LoyaltyProgram> {
    const isUnique = await this.isUnique(dto.name);

    if (isUnique) {
      return this.databaseService.loyaltyProgram.create({
        data: dto,
      });
    }
  }

  async findAll(): Promise<LoyaltyProgram[]> {
    return this.databaseService.loyaltyProgram.findMany();
  }

  async findOneById(id: number): Promise<LoyaltyProgram> {
    const program = await this.databaseService.loyaltyProgram.findUnique({
      where: { id },
    });

    if (!program) {
      throw new NotFoundException(`Loyalty program with id ${id} not found`);
    }

    return program;
  }

  async delete(id: number): Promise<LoyaltyProgram> {
    const program = await this.findOneById(id);

    if (program) {
      return this.databaseService.loyaltyProgram.delete({
        where: { id },
      });
    }
  }

  async update(id: number, dto: LoyaltyProgramDto): Promise<LoyaltyProgram> {
    const program = await this.findOneById(id);

    if (program.name !== dto.name) {
      await this.isUnique(dto.name);
    }

    return this.databaseService.loyaltyProgram.update({
      where: { id },
      data: dto,
    });
  }

  private async isUnique(name: string): Promise<boolean> {
    const program = await this.databaseService.loyaltyProgram.findUnique({
      where: { name },
    });

    if (program) {
      throw new BadRequestException(
        `Loyalty program with name "${name}" id exist`,
      );
    }

    return true;
  }
}
