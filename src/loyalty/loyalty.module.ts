import { Module } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { LoyaltyController } from './loyalty.controller';
import { LoyaltyProgramService } from './loyalty-program/loyalty-program.service';
import { LoyaltyProgramController } from './loyalty-program/loyalty-program.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [LoyaltyService, LoyaltyProgramService, DatabaseService],
  controllers: [LoyaltyController, LoyaltyProgramController],
})
export class LoyaltyModule {}
