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
import { HallPlaceService } from './hall-place.service';
import { HallPlace } from '@prisma/client';
import { HallPlaceDto } from '../dto';

@Controller('halls/hall-place')
export class HallPlaceController {
  constructor(private readonly hallPlaceService: HallPlaceService) {}

  @Post()
  async createHallPlace(@Body() dto: HallPlaceDto): Promise<HallPlace[]> {
    const isHasNotPlaces = await this.hallPlaceService.isHallHasNotPlaces(
      dto.hallId,
    );
    if (isHasNotPlaces) {
      return this.hallPlaceService.create(dto);
    }
  }

  @Get(':id')
  async findAllHallPlaces(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HallPlace[]> {
    return this.hallPlaceService.findAll(id);
  }

  @Delete(':id')
  async deleteAllHallPlaces(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HallPlace[]> {
    return this.hallPlaceService.delete(id);
  }

  @Put(':id')
  async updateHallPlaces(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: HallPlaceDto,
  ): Promise<HallPlace[]> {
    return this.hallPlaceService.update(id, dto);
  }
}
