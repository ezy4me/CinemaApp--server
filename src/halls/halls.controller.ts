import { Controller, Get } from '@nestjs/common';
import { HallsService } from './halls.service';

@Controller('halls')
export class HallsController {
  constructor(private readonly hallService: HallsService) {}

  @Get()
  async getAllHalls() {
    return {};
  }
}
