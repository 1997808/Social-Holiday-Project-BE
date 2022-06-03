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
import { VotecommentsService } from './votecomments.service';
import { CreateVotecommentDto } from './dto/create-votecomment.dto';
import { UpdateVotecommentDto } from './dto/update-votecomment.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { PostService } from 'src/posts/post.service';
import { VOTE } from 'src/common/constant';
import { CommentsService } from 'src/comments/comments.service';

@UseGuards(JwtAuthGuard)
@Controller('votecomments')
export class VotecommentsController {
  constructor(
    private readonly votecommentsService: VotecommentsService,
    private readonly postsService: PostService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post('/handle')
  async handleVotecomment(
    @Body() createVotecommentDto: CreateVotecommentDto,
    @Request() req,
  ) {
    const { commentId, vote } = createVotecommentDto;
    console.log(createVotecommentDto);

    const comment = await this.commentsService.findOne({
      id: commentId,
    });
    if (comment) {
      const votecomment = await this.votecommentsService.findOne({
        comment: commentId,
        user: req.user,
      });
      if (votecomment) {
        if (votecomment.vote == vote) {
          // press same vote
          await this.votecommentsService.update(
            { id: votecomment.id },
            { vote: VOTE.NEUTRAL },
          );
        } else {
          await this.votecommentsService.update(
            { id: votecomment.id },
            { vote: vote },
          );
        }
      } else {
        await this.votecommentsService.create(req.user, commentId, vote);
      }
      return true;
    }
    return false;
  }

  @Get()
  findAll() {
    return this.votecommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votecommentsService.findOne(+id);
  }

  @Get('check/:commentid')
  async checkUserVotecomment(@Request() req, @Param('commentid') id: string) {
    const vote = await this.votecommentsService.checkUserVotecomment(
      req.user,
      +id,
    );
    return vote;
  }

  @Get('comment/:commentid')
  async getVoteByCommentId(@Param('commentid') id: string) {
    const upvotes = await this.votecommentsService.findCommentUpvotes(+id);
    const downvotes = await this.votecommentsService.findCommentDownvotes(+id);
    return {
      upvotes,
      downvotes,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVotecommentDto: UpdateVotecommentDto,
  ) {
    return this.votecommentsService.update(+id, updateVotecommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.votecommentsService.delete(+id);
  }
}
