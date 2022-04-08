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
} from '@nestjs/common';
import { LikepostsService } from './likeposts.service';
import { CreateLikepostDto } from './dto/create-likepost.dto';
import { UpdateLikepostDto } from './dto/update-likepost.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { PostService } from 'src/posts/post.service';

@UseGuards(JwtAuthGuard)
@Controller('likeposts')
export class LikepostsController {
  constructor(
    private readonly likepostsService: LikepostsService,
    private readonly postsService: PostService,
  ) {}

  // @Post()
  // create(@Body() createLikepostDto: CreateLikepostDto, @Request() req) {
  //   return this.likepostsService.create(req.user, createLikepostDto);
  // }

  @Post('/handle')
  async handleLikepost(
    @Body() createLikepostDto: CreateLikepostDto,
    @Request() req,
  ) {
    const post = await this.postsService.findOne({
      id: createLikepostDto.postid,
    });
    if (post) {
      const likepost = await this.likepostsService.findOne({
        post: post,
        user: req.user,
      });
      if (likepost) {
        await this.likepostsService.delete({ id: likepost.id });
      } else {
        await this.likepostsService.create(req.user, post);
      }
      return true;
    }
    return false;
  }

  @Get()
  findAll() {
    return this.likepostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likepostsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLikepostDto: UpdateLikepostDto,
  ) {
    return this.likepostsService.update(+id, updateLikepostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likepostsService.delete(+id);
  }
}
