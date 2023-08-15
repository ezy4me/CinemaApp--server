import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Get,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { SessionTypeService } from './session-type.service';
import { SessionType } from '@prisma/client';
import { SessionTypeDto } from '../dto';
@Controller('sessions/type')
export class SessionTypeController {
  constructor(private readonly sessionTypeService: SessionTypeService) {}

  @Post()
  async createCard(@Body() dto: SessionTypeDto): Promise<SessionType> {
    return this.sessionTypeService.create(dto);
  }

  @Get()
  async findAllCards(): Promise<SessionType[]> {
    return this.sessionTypeService.findAll();
  }

  @Get(':id')
  async findOneCardById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SessionType> {
    return this.sessionTypeService.findOneById(id);
  }

  @Delete(':id')
  async deleteCard(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SessionType> {
    return this.sessionTypeService.delete(id);
  }

  @Put(':id')
  async updateCard(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SessionTypeDto,
  ): Promise<SessionType> {
    return this.sessionTypeService.update(id, dto);
  }
}
