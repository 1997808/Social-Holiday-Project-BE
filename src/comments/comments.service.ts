import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { IComment } from './entities/comment.interface';

@Injectable()
export class CommentsService extends BaseService<Comment> {
  constructor(@InjectRepository(Comment) repository: Repository<Comment>) {
    super(repository);
  }
  async create(createCommentDto: CreateCommentDto): Promise<IComment> {
    const date = new Date().toISOString();
    const data = {
      ...createCommentDto,
      createdAt: date,
      updatedAt: date,
    };
    return await this.repository.save(data);
  }
}
