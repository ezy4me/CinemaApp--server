import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { MovieDto } from './dto';
import { DeleteImageUtil } from '@common/utils';
import { MovieCountryService } from './movie-country/movie-country.service';
import { MovieGenreService } from './movie-gnere/movie-genre.service';
import { MovieAgeRatingService } from './movie-age-rating/movie-age-rating.service';
import * as fs from 'fs';
import { ImageConfig } from '@common/dto';

@Injectable()
export class MoviesService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly movieCountryService: MovieCountryService,
    private readonly movieGenreService: MovieGenreService,
    private readonly movieAgeRatingService: MovieAgeRatingService,
  ) {}

  async create(dto: MovieDto, imageConfig?: ImageConfig): Promise<Movie> {
    dto.duration = parseInt(dto.duration as any);
    dto.movieCountryId = parseInt(dto.movieCountryId as any);
    dto.movieGenreId = parseInt(dto.movieGenreId as any);
    dto.movieAgeRatingId = parseInt(dto.movieAgeRatingId as any);

    const isUnique = await this.isUnique(dto.title);

    if (isUnique) {
      await this.movieCountryService.findOneById(dto.movieCountryId);
      await this.movieGenreService.findOneById(dto.movieGenreId);
      await this.movieAgeRatingService.findOneById(dto.movieAgeRatingId);

      fs.writeFileSync(imageConfig.imagePath, imageConfig.imageFile.buffer);

      return this.databaseService.movie.create({
        data: {
          ...dto,
          previewImage: imageConfig.imageName,
          previewVideo: imageConfig.imageName,
        },
      });
    }
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

  async update(
    id: number,
    dto: MovieDto,
    imageConfig?: ImageConfig,
  ): Promise<Movie> {
    const movie = await this.databaseService.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    let isUnique = true;

    if (movie.title !== dto.title) {
      await this.isUnique(dto.title);

      isUnique = false;
    }

    if (isUnique) {
      dto.duration = parseInt(dto.duration as any);
      dto.movieCountryId = parseInt(dto.movieCountryId as any);
      dto.movieGenreId = parseInt(dto.movieGenreId as any);
      dto.movieAgeRatingId = parseInt(dto.movieAgeRatingId as any);

      await this.movieCountryService.findOneById(dto.movieCountryId);
      await this.movieGenreService.findOneById(dto.movieGenreId);
      await this.movieAgeRatingService.findOneById(dto.movieAgeRatingId);

      const updateMovie = await this.databaseService.movie.update({
        where: { id },
        data: {
          ...dto,
          previewImage: imageConfig.imageName,
          previewVideo: imageConfig.imageName,
        },
      });

      await DeleteImageUtil('movies/images', movie.previewImage);

      fs.writeFileSync(imageConfig.imagePath, imageConfig.imageFile.buffer);

      return updateMovie;
    }
  }

  async isUnique(title: string): Promise<boolean> {
    const movie = await this.databaseService.movie.findUnique({
      where: { title },
    });

    if (movie) {
      throw new NotFoundException(`Movie with title "${title}" is exist`);
    }

    return true;
  }
}
