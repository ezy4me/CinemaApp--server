import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ActorsService } from './actors.service';
import { Actor } from '@prisma/client';
import { CreateActorDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUpload } from '@common/decorators';
import { UpdateActorDto } from './dto/update-actor.dto';
import { ImageConfig } from '@common/dto';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorService: ActorsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createActor(
    @Body() dto: CreateActorDto,
    @ImageUpload('actors') imageConfig: ImageConfig,
  ): Promise<Actor> {
    return this.actorService.create(dto, imageConfig);
  }

  @Get()
  async findAllActors(): Promise<Actor[]> {
    return this.actorService.findAll();
  }

  @Get(':id')
  async findOneActorById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Actor> {
    return this.actorService.findOneById(id);
  }

  @Delete(':id')
  async deleteActor(@Param('id', ParseIntPipe) id: number): Promise<Actor> {
    return this.actorService.delete(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateActor(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateActorDto,
    @ImageUpload('actors') imageConfig: ImageConfig,
  ): Promise<Actor> {
    return this.actorService.update(id, dto, imageConfig);
  }
}
