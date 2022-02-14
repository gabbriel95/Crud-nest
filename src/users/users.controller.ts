import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(@Req() req): any {
    console.log(req.headers);
    /* if (req.headers['api-key'] !== '123') {
      throw new HttpException('sin autorización', 400);
    }*/
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() user: any): any {
    if (!user.nombre || !isNaN(user.nombre)) {
      //validador
      throw new HttpException('nombre invalido o vacio', 400);
    }
    return this.userService.createUser(user);
  }

  @Put(':id')
  modifyUser(@Param('id') id: number, @Body() user: any): any {
    return this.userService.modifyUser(+id, user);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: number): any {
    this.userService.delete(+id);
  }
}
