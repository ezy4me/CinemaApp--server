import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { HallPlaceDto } from '../dto';
import { HallPlace } from '@prisma/client';

@Injectable()
export class HallPlaceService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: HallPlaceDto): Promise<HallPlace[]> {
    const hallPlaces = [];

    for (let i = 0; i < dto.rowNumber; i++) {
      for (let j = 0; j < dto.seatNumber; j++) {
        hallPlaces.push({
          rowNumber: i + 1,
          seatNumber: j + 1,
          hallId: dto.hallId,
        });
      }
    }

    await this.databaseService.hallPlace.createMany({
      data: hallPlaces,
      skipDuplicates: true,
    });

    return hallPlaces;
  }

  async findAll(id: number): Promise<HallPlace[]> {
    return this.databaseService.hallPlace.findMany({
      where: { hallId: id },
    });
  }

  async delete(id: number): Promise<HallPlace[]> {
    const hallPlacesToDelete = await this.databaseService.hallPlace.findMany({
      where: { hallId: id },
    });

    if (!hallPlacesToDelete) {
      throw new BadRequestException(`This hall has not places`);
    }

    await this.databaseService.hallPlace.deleteMany({
      where: { hallId: id },
    });

    return hallPlacesToDelete;
  }

  async update(id: number, dto: HallPlaceDto): Promise<HallPlace[]> {
    await this.databaseService.hallPlace.deleteMany({
      where: { hallId: dto.hallId },
    });

    return this.create(dto);
  }

  async isHallHasNotPlaces(hallId: number): Promise<boolean> {
    const hallPlaces = await this.databaseService.hallPlace.findFirst({
      where: { hallId },
    });

    if (hallPlaces) {
      throw new BadRequestException(`This hall ${hallId} has places`);
    }

    return true;
  }
}
