import { Module } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { LoyaltyController } from './loyalty.controller';
import { LoyaltyProgramService } from './loyalty-program/loyalty-program.service';
import { LoyaltyProgramController } from './loyalty-program/loyalty-program.controller';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [
    LoyaltyService,
    LoyaltyProgramService,
    UsersService,
    DatabaseService,
  ],
  controllers: [LoyaltyController, LoyaltyProgramController],
  imports: [CacheModule.register()],
})
export class LoyaltyModule {}
