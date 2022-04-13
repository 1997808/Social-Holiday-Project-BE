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
import { VotepostsService } from './voteposts.service';
import { CreateVotepostDto } from './dto/create-votepost.dto';
import { UpdateVotepostDto } from './dto/update-votepost.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { PostService } from 'src/posts/post.service';
import { Vote } from 'src/common/constant';

@UseGuards(JwtAuthGuard)
@Controller('voteposts')
export class VotepostsController {
  constructor(
    private readonly votepostsService: VotepostsService,
    private readonly postsService: PostService,
  ) {}

  // @Post()
  // create(@Body() createVotepostDto: CreateVotepostDto, @Request() req) {
  //   return this.votepostsService.create(req.user, createVotepostDto);
  // }

  @Post('/handle')
  async handleVotepost(
    @Body() createVotepostDto: CreateVotepostDto,
    @Request() req,
  ) {
    const { postid, vote } = createVotepostDto;
    console.log(vote);
    const post = await this.postsService.findOne({
      id: postid,
    });
    if (post) {
      const votepost = await this.votepostsService.findOne({
        post: post,
        user: req.user,
      });
      if (votepost) {
        if (votepost.vote == vote) {
          // press same vote
          await this.votepostsService.update(
            { id: votepost.id },
            { vote: Vote.NEUTRAL },
          );
        } else {
          await this.votepostsService.update(
            { id: votepost.id },
            { vote: vote },
          );
        }
      } else {
        await this.votepostsService.create(req.user, post, vote);
      }
      return true;
    }
    return false;
  }

  @Get()
  findAll() {
    return this.votepostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votepostsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVotepostDto: UpdateVotepostDto,
  ) {
    return this.votepostsService.update(+id, updateVotepostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.votepostsService.delete(+id);
  }
}
