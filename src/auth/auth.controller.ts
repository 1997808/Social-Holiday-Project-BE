import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log(loginDto)
    return await this.authService.login(loginDto);
  }

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.create(user);
  }
}