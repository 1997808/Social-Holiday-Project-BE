import { Module } from '@nestjs/common';
import { LikepostsService } from './likeposts.service';
import { LikepostsController } from './likeposts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likepost } from './entities/likepost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Likepost])],
  controllers: [LikepostsController],
  providers: [LikepostsService]
})
export class LikepostsModule { }
