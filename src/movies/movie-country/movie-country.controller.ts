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
import { MovieCountryService } from './movie-country.service';
import { MovieCountryDto } from '../dto/movie-country.dto';
import { MovieCountry } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUpload } from '@common/decorators';

@Controller('movies/country')
export class MovieCountryController {
  constructor(private readonly movieCountryService: MovieCountryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createCountry(
    @Body() dto: MovieCountryDto,
    @ImageUpload('countries') image: string,
  ): Promise<MovieCountry> {
    const country = await this.movieCountryService.isUnique(dto.name, image);

    if (country) {
      return this.movieCountryService.create(dto, image);
    }
  }

  @Get()
  async findAllCountries(): Promise<MovieCountry[]> {
    return this.movieCountryService.findAll();
  }

  @Get(':id')
  async findOneCountryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MovieCountry> {
    return this.movieCountryService.findOneById(id);
  }

  @Delete(':id')
  async deleteCountry(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MovieCountry> {
    const country = await this.movieCountryService.findOneById(id);

    if (country) {
      return this.movieCountryService.delete(id);
    }
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateCountry(
    @Param('id', ParseIntPipe) id: number,
    dto: MovieCountryDto,
    @ImageUpload('countries') image: string,
  ): Promise<MovieCountry> {
    const country = await this.movieCountryService.findOneById(id);

    if (country) {
      return this.movieCountryService.update(id, dto, image);
    }
  }
}
