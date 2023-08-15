import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CinemaDto } from '../dto';
import { Cinema } from '@prisma/client';

@Injectable()
export class CinemaService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CinemaDto): Promise<Cinema> {
    return this.databaseService.cinema.create({
      data: dto,
    });
  }

  async findAll(): Promise<Cinema[]> {
    return this.databaseService.cinema.findMany();
  }

  async findOneById(id: number): Promise<Cinema> {
    const cinema = await this.databaseService.cinema.findUnique({
      where: { id },
    });

    if (!cinema) {
      throw new NotFoundException(`Cinema with id ${id} not found`);
    }

    return cinema;
  }

  async delete(id: number): Promise<Cinema> {
    const cinema = await this.findOneById(id);

    if (cinema) {
      return this.databaseService.cinema.delete({
        where: { id },
      });
    }
  }

  async update(id: number, dto: CinemaDto): Promise<Cinema> {
    const cinema = await this.findOneById(id);

    if (cinema) {
      return this.databaseService.cinema.update({
        where: { id },
        data: dto,
      });
    }
  }
}
