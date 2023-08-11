import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { UsersService } from 'src/users/users.service';
import { Tokens } from './interfaces';
import { compareSync } from 'bcrypt';
import { User, Token } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { v4 } from 'uuid';
import { add } from 'date-fns';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UsersService,
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async refreshTokens(refreshToken: string): Promise<Tokens> {
    const token = await this.databaseService.token.delete({
      where: { token: refreshToken },
    });

    if (!token) {
      throw new UnauthorizedException();
    }

    const user: User = await this.databaseService.user.findUnique({
      where: { id: token.userId },
    });

    console.log(user);

    return this.generateTokens(user);
  }

  async register(dto: RegisterDto) {
    const userEmail: User = await this.userService
      .findOne(dto.email)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (userEmail) {
      throw new ConflictException(
        'Пользователь с таким email уже зарегистрирован',
      );
    }

    const userPhone: User = await this.userService
      .findOne(dto.phone)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (userPhone) {
      throw new ConflictException(
        'Пользователь с таким номером телефаона уже зарегистрирован',
      );
    }

    return this.userService.save(dto).catch((err) => {
      this.logger.error(err);
      return null;
    });
  }

  async login(dto: LoginDto): Promise<Tokens> {
    const user: User = await this.userService
      .findOne(dto.email)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Неверный логин или пароль!');
    }

    return this.generateTokens(user);
  }

  private async generateTokens(user: User): Promise<Tokens> {
    const accesToken =
      'Bearer ' +
      this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: await this.databaseService.role.findUnique({
          where: { id: user.roleId },
        }),
      });

    const refreshToken = await this.getRefreshToken(user.id);

    return { accesToken, refreshToken };
  }

  private async getRefreshToken(userId: number): Promise<Token> {
    return this.databaseService.token.create({
      data: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
        userId,
      },
    });
  }
}
