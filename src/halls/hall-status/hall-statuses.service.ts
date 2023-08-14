import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { HallStatusDto } from '../dto';
import { HallStatus } from '@prisma/client';

@Injectable()
export class HallStatusesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: HallStatusDto): Promise<HallStatus> {
    return this.databaseService.hallStatus.create({
      data: dto,
    });
  }

  async findAll(): Promise<HallStatus[]> {
    return this.databaseService.hallStatus.findMany();
  }

  async findOneById(id: number): Promise<HallStatus> {
    const hallStatus: HallStatus =
      await this.databaseService.hallStatus.findUnique({
        where: { id },
      });

    if (!hallStatus) {
      throw new NotFoundException(`Status with id ${id} not found`);
    }

    return hallStatus;
  }

  async findUniqueStatus(name: string): Promise<boolean> {
    const hallStatus: HallStatus =
      await this.databaseService.hallStatus.findUnique({
        where: { name },
      });

    if (hallStatus) {
      throw new NotFoundException(`Status with name "${name}" is exist`);
    }

    return true;
  }

  async delete(id: number): Promise<HallStatus> {
    return this.databaseService.hallStatus.delete({
      where: { id },
    });
  }

  async update(id: number, dto: HallStatusDto): Promise<HallStatus> {
    return this.databaseService.hallStatus.update({
      where: { id },
      data: dto,
    });
  }
}
