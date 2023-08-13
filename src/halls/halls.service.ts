import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class HallsService {
  constructor(private readonly databaseService: DatabaseService) {}
}
