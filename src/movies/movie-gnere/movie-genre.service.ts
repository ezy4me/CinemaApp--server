import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieGenre } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { MovieGenreDto } from '../dto';

@Injectable()
export class MovieGenreService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: MovieGenreDto): Promise<MovieGenre> {
    return this.databaseService.movieGenre.create({
      data: dto,
    });
  }

  async findAll(): Promise<MovieGenre[]> {
    return this.databaseService.movieGenre.findMany();
  }

  async findOneById(id: number): Promise<MovieGenre> {
    const genre = await this.databaseService.movieGenre.findUnique({
      where: { id },
    });

    if (!genre) {
      throw new NotFoundException(`Genre with id ${id} not found`);
    }

    return genre;
  }

  async isUnique(name: string): Promise<boolean> {
    const genre = await this.databaseService.movieGenre.findUnique({
      where: { name },
    });

    if (genre) {
      throw new NotFoundException(`Genre with name "${name}" is exist`);
    }

    return true;
  }

  async delete(id: number): Promise<MovieGenre> {
    return this.databaseService.movieGenre.delete({
      where: { id },
    });
  }

  async update(id: number, dto: MovieGenreDto): Promise<MovieGenre> {
    return this.databaseService.movieGenre.update({
      where: { id },
      data: dto,
    });
  }
}
