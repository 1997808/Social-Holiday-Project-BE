import { Module } from '@nestjs/common';
import { LikecommentsService } from './likecomments.service';
import { LikecommentsController } from './likecomments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likecomment } from './entities/likecomment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Likecomment])],
  controllers: [LikecommentsController],
  providers: [LikecommentsService],
})
export class LikecommentsModule {}
