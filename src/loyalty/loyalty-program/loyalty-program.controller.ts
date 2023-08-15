import { LoyaltyProgram } from '@prisma/client';
import { LoyaltyProgramDto } from '../dto';
import { LoyaltyProgramService } from './loyalty-program.service';
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

@Controller('loyalty/program')
export class LoyaltyProgramController {
  constructor(private readonly loyaltyProgramService: LoyaltyProgramService) {}

  @Post()
  async createProgram(@Body() dto: LoyaltyProgramDto): Promise<LoyaltyProgram> {
    return this.loyaltyProgramService.create(dto);
  }

  @Get()
  async findAllPrograms(): Promise<LoyaltyProgram[]> {
    return this.loyaltyProgramService.findAll();
  }

  @Get(':id')
  async findOneProgramById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LoyaltyProgram> {
    return this.loyaltyProgramService.findOneById(id);
  }

  @Delete(':id')
  async deleteProgram(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LoyaltyProgram> {
    return this.loyaltyProgramService.delete(id);
  }

  @Put(':id')
  async updateProgram(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: LoyaltyProgramDto,
  ): Promise<LoyaltyProgram> {
    return this.loyaltyProgramService.update(id, dto);
  }
}
