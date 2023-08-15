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
import { LoyaltyService } from './loyalty.service';
import { LoyaltyCardDto } from './dto';
import { LoyaltyCard } from '@prisma/client';

@Controller('loyalty')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Post()
  async createCard(@Body() dto: LoyaltyCardDto): Promise<LoyaltyCard> {
    return this.loyaltyService.create(dto);
  }

  @Get()
  async findAllCards(): Promise<LoyaltyCard[]> {
    return this.loyaltyService.findAll();
  }

  @Get(':id')
  async findOneCardById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LoyaltyCard> {
    return this.loyaltyService.findOneById(id);
  }

  @Delete(':id')
  async deleteCard(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LoyaltyCard> {
    return this.loyaltyService.delete(id);
  }

  @Put(':id')
  async updateCard(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: LoyaltyCardDto,
  ): Promise<LoyaltyCard> {
    return this.loyaltyService.update(id, dto);
  }
}
