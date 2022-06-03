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
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@Request() req) {
    return await this.usersService.findById(req.user.id);
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
  @Post('/profile')
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/profile/icon')
  @UseInterceptors(FileInterceptor('file'))
  async setProfileImage(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.usersService.uploadImageToCloudinary(file);
    if (file && result) {
      await this.usersService.update(
        { id: req.user.id },
        {
          profilePictureUrl: result.secure_url,
          cloudinaryId: result.public_id,
        },
      );
      return true;
    }
    return false;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.delete(+id);
  }
}
