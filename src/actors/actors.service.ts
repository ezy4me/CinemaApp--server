import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateActorDto } from './dto';
import { Actor } from '@prisma/client';
import { UpdateActorDto } from './dto/update-actor.dto';
import { DeleteImageUtil } from '@common/utils';

@Injectable()
export class ActorsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateActorDto, imageName: string): Promise<Actor> {
    dto.age = parseInt(dto.age as any);
    return this.databaseService.actor.create({
      data: {
        ...dto,
        image: imageName,
      },
    });
  }

  async findAll(): Promise<Actor[]> {
    return this.databaseService.actor.findMany();
  }

  async findOneById(id: number): Promise<Actor> {
    const actor = await this.databaseService.actor.findUnique({
      where: { id },
    });

    if (!actor) {
      throw new NotFoundException(`Actor with id ${id} not found`);
    }

    return actor;
  }

  async delete(id: number): Promise<Actor> {
    const deleted: Actor = await this.databaseService.actor.delete({
      where: { id },
    });

    if (deleted) {
      await DeleteImageUtil('actors', deleted.image);
    }

    return deleted;
  }

  async update(
    id: number,
    dto: UpdateActorDto,
    imageName: string,
  ): Promise<Actor> {
    const actor = await this.databaseService.actor.findUnique({
      where: { id },
    });

    if (!actor) {
      throw new NotFoundException(`Actor with id ${id} not found`);
    }

    dto.age = parseInt(dto.age as any);

    const updatedActor = await this.databaseService.actor.update({
      where: { id },
      data: {
        ...dto,
        image: imageName,
      },
    });

    return updatedActor;
  }
}
