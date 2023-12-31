import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseService } from 'src/database/database.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [UsersService, DatabaseService],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [CacheModule.register()],
})
export class UsersModule {}
