import { Module } from '@nestjs/common';
import { VotepostsService } from './voteposts.service';
import { VotepostsController } from './voteposts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Votepost } from './entities/votepost.entity';
import { PostsModule } from 'src/posts/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([Votepost]), PostsModule],
  controllers: [VotepostsController],
  providers: [VotepostsService],
})
export class VotepostsModule {}
