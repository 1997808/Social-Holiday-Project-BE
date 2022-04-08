import { Module } from '@nestjs/common';
import { LikepostsService } from './likeposts.service';
import { LikepostsController } from './likeposts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likepost } from './entities/likepost.entity';
import { PostsModule } from 'src/posts/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([Likepost]), PostsModule],
  controllers: [LikepostsController],
  providers: [LikepostsService],
})
export class LikepostsModule {}
