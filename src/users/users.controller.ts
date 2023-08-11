import { Body, Post, Get, Param, Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.save(dto);
  }

  @Get()
  findAllUsers() {
    return this.userService.findAll();
  }

  @Get(':email')
  findOneUser(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
