import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { HallDto } from './dto';
import { Hall } from '@prisma/client';

@Injectable()
export class HallsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: HallDto): Promise<Hall> {
    return this.databaseService.hall.create({
      data: dto,
    });
  }

  async findAll(): Promise<Hall[]> {
    return this.databaseService.hall.findMany();
  }

  async findOneById(id: number): Promise<Hall> {
    const hall = await this.databaseService.hall.findUnique({
      where: { id },
    });

    if (!hall) {
      throw new NotFoundException(`Hall with id ${id} not found`);
    }

    return hall;
  }

  async delete(id: number): Promise<Hall> {
    return this.databaseService.hall.delete({
      where: { id },
    });
  }

  async update(id: number, dto: HallDto): Promise<Hall> {
    return this.databaseService.hall.update({
      where: { id },
      data: dto,
    });
  }

  async cinemaHasHall(cinemaId: number, hallNumber: string): Promise<boolean> {
    const hall: Hall = await this.databaseService.hall.findFirst({
      where: { cinemaId, number: hallNumber },
    });

    if (hall) {
      throw new BadRequestException(
        `This hall number "${hallNumber}" in this cinema is exist`,
      );
    }

    return true;
  }
}
