import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieAgeRating } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { MovieAgeRatingDto } from '../dto';

@Injectable()
export class MovieAgeRatingService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: MovieAgeRatingDto): Promise<MovieAgeRating> {
    return this.databaseService.movieAgeRating.create({
      data: dto,
    });
  }

  async findAll(): Promise<MovieAgeRating[]> {
    return this.databaseService.movieAgeRating.findMany();
  }

  async findOneById(id: number): Promise<MovieAgeRating> {
    const ageRating = await this.databaseService.movieAgeRating.findUnique({
      where: { id },
    });

    if (!ageRating) {
      throw new NotFoundException(`Movie age rating with id ${id} not found`);
    }

    return ageRating;
  }

  async delete(id: number): Promise<MovieAgeRating> {
    return this.databaseService.movieAgeRating.delete({
      where: { id },
    });
  }

  async update(id: number, dto: MovieAgeRatingDto): Promise<MovieAgeRating> {
    return this.databaseService.movieAgeRating.update({
      where: { id },
      data: dto,
    });
  }

  async isUnique(name: string): Promise<boolean> {
    const ageRating = await this.databaseService.movieAgeRating.findUnique({
      where: { name: name },
    });

    if (ageRating) {
      throw new NotFoundException(`Movie age rating name "${name}" is exist`);
    }

    return true;
  }
}
