import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { options } from './config';
import { DatabaseService } from 'src/database/database.service';
import { STRATEGIES } from './strategies';
import { GUARDS } from './guards';

@Module({
  providers: [AuthService, DatabaseService, ...STRATEGIES, ...GUARDS],
  controllers: [AuthController],
  imports: [PassportModule, JwtModule.registerAsync(options()), UsersModule],
})
export class AuthModule {}
