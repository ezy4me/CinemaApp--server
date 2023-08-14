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
import { MovieGenreService } from './movie-genre.service';
import { MovieGenreDto } from '../dto';
import { MovieGenre } from '@prisma/client';

@Controller('movies/genre')
export class MovieGenreController {
  constructor(private readonly movieGenreService: MovieGenreService) {}

  @Post()
  async createGenre(@Body() dto: MovieGenreDto): Promise<MovieGenre> {
    const isUnique = await this.movieGenreService.isUnique(dto.name);

    if (isUnique) {
      return this.movieGenreService.create(dto);
    }
  }

  @Get()
  async findAllGenres(): Promise<MovieGenre[]> {
    return this.movieGenreService.findAll();
  }

  @Get(':id')
  async findOneGenreById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MovieGenre> {
    return this.movieGenreService.findOneById(id);
  }

  @Delete(':id')
  async deleteGenre(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MovieGenre> {
    const genre = await this.movieGenreService.findOneById(id);
    if (genre) {
      return this.movieGenreService.delete(id);
    }
  }

  @Put(':id')
  async updateGenre(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MovieGenreDto,
  ): Promise<MovieGenre> {
    const genre = await this.movieGenreService.findOneById(id);
    if (genre) {
      return this.movieGenreService.update(id, dto);
    }
  }
}
