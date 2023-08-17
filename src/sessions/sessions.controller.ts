import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { SessionsService } from './sessions.service';
import { SessionDto } from './dto';
import { Session } from '@prisma/client';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionService: SessionsService) {}

  @Post()
  async createSession(@Body() dto: SessionDto): Promise<Session> {
    return this.sessionService.create(dto);
  }

  @Get()
  async findAllSessions(): Promise<Session[]> {
    return this.sessionService.findAll();
  }

  @Get(':id')
  async findOneSessionById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Session> {
    return this.sessionService.findOneById(id);
  }

  @Delete(':id')
  async deleteSession(@Param('id', ParseIntPipe) id: number): Promise<Session> {
    return this.sessionService.delete(id);
  }

  @Put(':id')
  async updateSession(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SessionDto,
  ): Promise<Session> {
    return this.sessionService.update(id, dto);
  }
}
