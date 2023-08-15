import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { MovieDto } from './dto';
import { DeleteImageUtil } from '@common/utils';

@Injectable()
export class MoviesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: MovieDto, image?: string): Promise<Movie> {
    dto.duration = parseInt(dto.duration as any);
    dto.movieCountryId = parseInt(dto.movieCountryId as any);
    dto.movieGenreId = parseInt(dto.movieGenreId as any);
    dto.movieAgeRatingId = parseInt(dto.movieAgeRatingId as any);
    return this.databaseService.movie.create({
      data: {
        ...dto,
        previewImage: image,
        previewVideo: image,
      },
    });
  }

  async findAll(): Promise<Movie[]> {
    return this.databaseService.movie.findMany();
  }

  async findOneById(id: number): Promise<Movie> {
    const movie = await this.databaseService.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    return movie;
  }

  async delete(id: number): Promise<Movie> {
    const deleted: Movie = await this.databaseService.movie.delete({
      where: { id },
    });

    if (deleted) {
      await DeleteImageUtil('movies/images', deleted.previewImage);
    }

    return deleted;
  }

  async update(id: number, dto: MovieDto, image?: string): Promise<Movie> {
    const movie = await this.databaseService.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    dto.duration = parseInt(dto.duration as any);
    dto.movieCountryId = parseInt(dto.movieCountryId as any);
    dto.movieGenreId = parseInt(dto.movieGenreId as any);
    dto.movieAgeRatingId = parseInt(dto.movieAgeRatingId as any);

    const updateMovie = await this.databaseService.movie.update({
      where: { id },
      data: {
        ...dto,
        previewImage: image,
        previewVideo: image,
      },
    });

    await DeleteImageUtil('movies/images', movie.previewImage);

    return updateMovie;
  }
}
