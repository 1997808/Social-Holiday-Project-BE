import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('checkLogin')
  async checkLogin(@Req() request: Request) {
    return await this.authService.checkLogin(request);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.create(user);
  }
}
