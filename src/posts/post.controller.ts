import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from 'src/users/users.service';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return await this.postService.create(req.user, createPostDto);
  }

  @Post('/image')
  @UseInterceptors(FileInterceptor('file'))
  async createImage(
    @Request() req,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    if (file) {
      const result = await this.usersService.uploadImageToCloudinary(file);
      if (result) {
        createPostDto.imageUrl = [result.public_id];
        return await this.postService.create(req.user, createPostDto);
      }
      return false;
    } else {
      return await this.postService.create(req.user, createPostDto);
    }
  }

  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @Get('all')
  async findAllPost(@Body() query) {
    return await this.postService.findAllPost(query);
  }

  @Get('profile/:userId')
  async findProfilePost(@Body() query, @Param('userId') userId: string) {
    return await this.postService.findProfilePost(query, +userId);
  }

  @Get(':id')
  async findPostDetail(@Param('id') id: string) {
    return await this.postService.findPostDetail(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postService.delete(+id);
  }
}
