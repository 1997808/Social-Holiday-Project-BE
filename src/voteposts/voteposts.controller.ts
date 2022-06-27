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
import { VOTE } from 'src/common/constant';

@UseGuards(JwtAuthGuard)
@Controller('voteposts')
export class VotepostsController {
  constructor(
    private readonly votepostsService: VotepostsService,
    private readonly postsService: PostService,
  ) {}

  @Post('/handle')
  async handleVotepost(
    @Body() createVotepostDto: CreateVotepostDto,
    @Request() req,
  ) {
    const { postid, vote } = createVotepostDto;
    const post = await this.postsService.findOne({
      id: postid,
    });
    if (post) {
      const votepost = await this.votepostsService.findOne({
        post: postid,
        user: req.user,
      });
      if (votepost) {
        if (votepost.vote == vote) {
          // press same vote
          await this.votepostsService.update(
            { id: votepost.id },
            { vote: VOTE.NEUTRAL },
          );
        } else {
          await this.votepostsService.update(
            { id: votepost.id },
            { vote: vote },
          );
        }
      } else {
        await this.votepostsService.create(req.user, postid, vote);
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

  @Get('check/:postid')
  async checkUserVotepost(@Request() req, @Param('postid') id: string) {
    const vote = await this.votepostsService.checkUserVotepost(req.user, +id);
    return vote;
  }

  @Get('post/:postid')
  async getVoteByPostid(@Param('postid') id: string) {
    const upvotes = await this.votepostsService.findPostUpvotes(+id);
    const downvotes = await this.votepostsService.findPostDownvotes(+id);
    return {
      upvotes,
      downvotes,
    };
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
