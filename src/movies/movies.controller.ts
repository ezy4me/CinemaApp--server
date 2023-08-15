import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto';
import { Movie } from '@prisma/client';
import { ImageUpload } from '@common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createMovie(
    @Body() dto: MovieDto,
    @ImageUpload('movies/images') image: string,
  ): Promise<Movie> {
    return this.movieService.create(dto, image);
  }

  @Get()
  async findAllMovies(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  async findOneMovieById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Movie> {
    return this.movieService.findOneById(id);
  }

  @Delete(':id')
  async deleteMovie(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    const movie = await this.movieService.findOneById(id);

    if (movie) {
      return this.movieService.delete(id);
    }
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MovieDto,
    @ImageUpload('movies/images') image: string,
  ): Promise<Movie> {
    return this.movieService.update(id, dto, image);
  }
}
