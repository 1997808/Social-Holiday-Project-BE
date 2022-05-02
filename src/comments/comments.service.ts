import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { IComment } from './entities/comment.interface';

@Injectable()
export class CommentsService extends BaseService<Comment> {
  constructor(@InjectRepository(Comment) repository: Repository<Comment>) {
    super(repository);
  }
  async create(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<IComment> {
    const date = new Date().toISOString();
    const data = {
      ...createCommentDto,
      author: user,
      createdAt: date,
      updatedAt: date,
    };
    return await this.repository.save(data);
  }
}
