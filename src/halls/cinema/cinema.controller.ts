import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaDto } from '../dto';
import { Cinema } from '@prisma/client';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Post()
  async createCinema(@Body() dto: CinemaDto): Promise<Cinema> {
    return this.cinemaService.create(dto);
  }

  @Get()
  async findAllCinemas(): Promise<Cinema[]> {
    return this.cinemaService.findAll();
  }

  @Get(':id')
  async findOneCinemaById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Cinema> {
    return this.cinemaService.findOneById(id);
  }

  @Delete(':id')
  async deleteCinema(@Param('id', ParseIntPipe) id: number): Promise<Cinema> {
    const cinema = await this.cinemaService.findOneById(id);
    if (cinema) {
      return this.cinemaService.delete(id);
    }
  }

  @Put(':id')
  async updateCinema(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CinemaDto,
  ): Promise<Cinema> {
    const cinema = await this.cinemaService.findOneById(id);
    if (cinema) {
      return this.cinemaService.update(id, dto);
    }
  }
}
