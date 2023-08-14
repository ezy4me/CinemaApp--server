import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieCountry } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { MovieCountryDto } from '../dto';
import { DeleteImageUtil } from '@common/utils';

@Injectable()
export class MovieCountryService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: MovieCountryDto, imageName: string): Promise<MovieCountry> {
    return this.databaseService.movieCountry.create({
      data: {
        ...dto,
        image: imageName,
      },
    });
  }

  async findAll(): Promise<MovieCountry[]> {
    return this.databaseService.movieCountry.findMany();
  }

  async findOneById(id: number): Promise<MovieCountry> {
    const country = await this.databaseService.movieCountry.findUnique({
      where: { id },
    });

    if (!country) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }

    return country;
  }

  async isUnique(name: string, image?: string): Promise<boolean> {
    const country = await this.databaseService.movieCountry.findUnique({
      where: { name },
    });

    if (country) {
      await DeleteImageUtil('countries', image);
      throw new NotFoundException(`Country with name "${name}" is exist`);
    }

    return true;
  }

  async delete(id: number): Promise<MovieCountry> {
    const deleted: MovieCountry =
      await this.databaseService.movieCountry.delete({
        where: { id },
      });

    if (deleted) {
      await DeleteImageUtil('countries', deleted.image);
    }

    return deleted;
  }

  async update(
    id: number,
    dto: MovieCountryDto,
    imageName: string,
  ): Promise<MovieCountry> {
    return this.databaseService.movieCountry.update({
      where: { id },
      data: {
        ...dto,
        image: imageName,
      },
    });
  }
}
