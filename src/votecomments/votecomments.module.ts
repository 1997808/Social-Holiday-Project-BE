import { Module } from '@nestjs/common';
import { VotecommentsService } from './votecomments.service';
import { VotecommentsController } from './votecomments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Votecomment } from './entities/votecomment.entity';
import { PostsModule } from 'src/posts/post.module';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Votecomment]),
    PostsModule,
    CommentsModule,
  ],
  controllers: [VotecommentsController],
  providers: [VotecommentsService],
})
export class VotecommentsModule {}
