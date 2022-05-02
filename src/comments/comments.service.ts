import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CommentQueryDto, CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { IComment, ICommentPaginate } from './entities/comment.interface';

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

  async getPostComments(query: CommentQueryDto): Promise<ICommentPaginate> {
    const { postId } = query;
    const take = query.take || 15;
    const page = query.page || 1;
    const skipSocket = query.skipSocket || 0;
    const skip = (page - 1) * take + skipSocket;

    const [result, total] = await this.repository
      .createQueryBuilder('comment')
      .where('comment.post.id = :postId', { postId })
      .leftJoinAndSelect('comment.author', 'user')
      .orderBy('comment.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return {
      data: result,
      count: total,
    };
  }
}
