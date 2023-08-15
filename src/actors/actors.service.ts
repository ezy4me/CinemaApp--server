import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateActorDto } from './dto';
import { Actor } from '@prisma/client';
import { UpdateActorDto } from './dto/update-actor.dto';
import { DeleteImageUtil } from '@common/utils';
import { ImageConfig } from '@common/dto';
import * as fs from 'fs';

@Injectable()
export class ActorsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateActorDto, imageConfig: ImageConfig): Promise<Actor> {
    dto.age = parseInt(dto.age as any);
    fs.writeFileSync(imageConfig.imagePath, imageConfig.imageFile.buffer);

    return this.databaseService.actor.create({
      data: {
        ...dto,
        image: imageConfig.imageName,
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
    const actor = await this.findOneById(id);

    if (actor) {
      const deleted: Actor = await this.databaseService.actor.delete({
        where: { id },
      });

      if (deleted) {
        await DeleteImageUtil('actors', deleted.image);
      }

      return deleted;
    }
  }

  async update(
    id: number,
    dto: UpdateActorDto,
    imageConfig: ImageConfig,
  ): Promise<Actor> {
    const actor = await this.findOneById(id);

    if (actor) {
      dto.age = parseInt(dto.age as any);

      const updatedActor = await this.databaseService.actor.update({
        where: { id },
        data: {
          ...dto,
          image: imageConfig.imageName,
        },
      });

      await DeleteImageUtil('actors', actor.image);

      fs.writeFileSync(imageConfig.imagePath, imageConfig.imageFile.buffer);

      return updatedActor;
    }
  }
}
