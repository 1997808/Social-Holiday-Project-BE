import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
// import { UserQueryDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async findAll() {
    return await this.usersService.index();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/search')
  async findUserByName(@Body() query) {
    return await this.usersService.findUserByName(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile/:id')
  async findUserProfileById(@Param('id') id: string) {
    return await this.usersService.findUserProfileById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/profile/icon')
  @UseInterceptors(FileInterceptor('file'))
  async setProfileImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    // return await this.usersService.uploadImageToCloudinary(file);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.delete(+id);
  }
}
