import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SessionType } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { SessionTypeDto } from '../dto';
@Injectable()
export class SessionTypeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: SessionTypeDto): Promise<SessionType> {
    const isUnique = await this.isUnique(dto.name);

    if (isUnique) {
      return this.databaseService.sessionType.create({
        data: dto,
      });
    }
  }

  async findAll(): Promise<SessionType[]> {
    return this.databaseService.sessionType.findMany();
  }

  async findOneById(id: number): Promise<SessionType> {
    const type = await this.databaseService.sessionType.findUnique({
      where: { id },
    });

    if (!type) {
      throw new NotFoundException(`Session type with id ${id} not found`);
    }

    return type;
  }

  async delete(id: number): Promise<SessionType> {
    const type = await this.findOneById(id);

    if (type) {
      return this.databaseService.sessionType.delete({
        where: { id },
      });
    }
  }

  async update(id: number, dto: SessionTypeDto): Promise<SessionType> {
    const type = await this.findOneById(id);

    if (type.name !== dto.name) {
      await this.isUnique(dto.name);
    }

    if (type) {
      return this.databaseService.sessionType.update({
        where: { id },
        data: dto,
      });
    }
  }

  private async isUnique(name: string): Promise<boolean> {
    const program = await this.databaseService.sessionType.findUnique({
      where: { name },
    });

    if (program) {
      throw new BadRequestException(
        `Session type with name "${name}" id exist`,
      );
    }

    return true;
  }
}
