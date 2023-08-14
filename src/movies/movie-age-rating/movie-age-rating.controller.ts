import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MovieAgeRatingService } from './movie-age-rating.service';
import { MovieAgeRating } from '@prisma/client';
import { MovieAgeRatingDto } from '../dto';

@Controller('movies/age-rating')
export class MovieAgeRatingController {
  constructor(private readonly movieAgeRatingService: MovieAgeRatingService) {}

  @Post()
  async createAgeRating(
    @Body() dto: MovieAgeRatingDto,
  ): Promise<MovieAgeRating> {
    const isUnique = await this.movieAgeRatingService.isUnique(dto.name);

    if (isUnique) {
      return this.movieAgeRatingService.create(dto);
    }
  }

  @Get()
  async findAllAgeRatings(): Promise<MovieAgeRating[]> {
    return this.movieAgeRatingService.findAll();
  }

  @Get(':id')
  async findOneAgeRatingById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MovieAgeRating> {
    return this.movieAgeRatingService.findOneById(id);
  }

  @Delete(':id')
  async deleteAgeRating(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MovieAgeRating> {
    const ageRating = await this.movieAgeRatingService.findOneById(id);

    if (ageRating) {
      return this.movieAgeRatingService.delete(id);
    }
  }

  @Put(':id')
  async updateAgeRating(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MovieAgeRatingDto,
  ): Promise<MovieAgeRating> {
    const isUnique = await this.movieAgeRatingService.isUnique(dto.name);

    if (isUnique) {
      return this.movieAgeRatingService.update(id, dto);
    }
  }
}
