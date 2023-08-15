import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { SessionTypeService } from './session-type/session-type.service';
import { SessionTypeController } from './session-type/session-type.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [SessionsService, SessionTypeService, DatabaseService],
  controllers: [SessionsController, SessionTypeController],
})
export class SessionsModule {}
