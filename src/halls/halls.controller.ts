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
import { HallsService } from './halls.service';
import { HallDto } from './dto';
import { Hall } from '@prisma/client';

@Controller('halls')
export class HallsController {
  constructor(private readonly hallService: HallsService) {}

  @Post()
  async createHall(@Body() dto: HallDto): Promise<Hall> {
    const isUniqeHallInCinema = await this.hallService.cinemaHasHall(
      dto.cinemaId,
      dto.number,
    );

    if (isUniqeHallInCinema) {
      return this.hallService.create(dto);
    }
  }

  @Get()
  async findAllHalls(): Promise<Hall[]> {
    return this.hallService.findAll();
  }

  @Get(':id')
  async findOneHallById(@Param('id', ParseIntPipe) id: number): Promise<Hall> {
    return this.hallService.findOneById(id);
  }

  @Delete(':id')
  async deleteHall(@Param('id', ParseIntPipe) id: number): Promise<Hall> {
    const hall = await this.hallService.findOneById(id);

    if (hall) {
      return this.hallService.delete(id);
    }
  }

  @Put(':id')
  async updateHall(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: HallDto,
  ): Promise<Hall> {
    const hall = await this.hallService.findOneById(id);

    const isUniqeHallInCinema = await this.hallService.cinemaHasHall(
      dto.cinemaId,
      dto.number,
    );

    if (hall && isUniqeHallInCinema) {
      return this.hallService.update(id, dto);
    }
  }
}
