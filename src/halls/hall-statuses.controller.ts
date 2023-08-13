import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { HallStatusesService } from './hall-statuses.service';
import { HallStatus } from '@prisma/client';
import { HallStatusDto } from './dto';

@Controller('halls/status')
export class HallStatusesController {
  constructor(private readonly hallStatusService: HallStatusesService) {}

  @Post()
  async createStatus(@Body() dto: HallStatusDto): Promise<HallStatus> {
    const isUnique = await this.hallStatusService.findUniqueStatus(dto.name);
    if (isUnique) {
      return this.hallStatusService.create(dto);
    }
  }

  @Get()
  async findAllStatuses(): Promise<HallStatus[]> {
    return this.hallStatusService.findAll();
  }

  @Get(':id')
  async findOneStatusById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HallStatus> {
    return this.hallStatusService.findOneById(id);
  }

  @Delete(':id')
  async deleteStatus(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HallStatus> {
    const hallStatus = await this.hallStatusService.findOneById(id);
    if (hallStatus) {
      return this.hallStatusService.delete(id);
    }
  }

  @Put(':id')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: HallStatusDto,
  ): Promise<HallStatus> {
    const hallStatus = await this.hallStatusService.findOneById(id);
    const isUnique = await this.hallStatusService.findUniqueStatus(dto.name);

    if (hallStatus && isUnique) {
      return this.hallStatusService.update(id, dto);
    }
  }
}
