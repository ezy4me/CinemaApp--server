import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SessionDto } from './dto';
import { Session } from '@prisma/client';

@Injectable()
export class SessionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: SessionDto): Promise<Session> {
    const session = await this.isUnique(dto);

    if (session) {
      return this.databaseService.session.create({
        data: dto,
      });
    }
  }

  async findAll(): Promise<Session[]> {
    return this.databaseService.session.findMany();
  }

  async findOneById(id: number): Promise<Session> {
    const session = await this.databaseService.session.findUnique({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException(`Session with id ${id} not found`);
    }

    return session;
  }

  async delete(id: number): Promise<Session> {
    const session = await this.findOneById(id);

    if (session) {
      return this.databaseService.session.delete({
        where: { id },
      });
    }
  }

  async update(id: number, dto: SessionDto): Promise<Session> {
    const session = await this.findOneById(id);
    const isUnique = await this.isUnique(dto);

    if (session && isUnique) {
      return this.databaseService.session.update({
        where: { id },
        data: dto,
      });
    }
  }

  private async isUnique(dto: SessionDto): Promise<boolean> {
    const { startTime, date, movieId, sessionTypeId, hallId } = dto;

    const session = await this.databaseService.session.findFirst({
      where: { startTime, date, movieId, sessionTypeId, hallId },
    });

    if (session) {
      throw new BadRequestException(`Session with data: ${dto} is exist`);
    }

    return true;
  }
}
