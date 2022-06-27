import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { VOTE } from 'src/common/constant';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Votecomment } from './entities/votecomment.entity';
import { IVotecomment } from './entities/votecomment.interface';

@Injectable()
export class VotecommentsService extends BaseService<Votecomment> {
  constructor(
    @InjectRepository(Votecomment) repository: Repository<Votecomment>,
  ) {
    super(repository);
  }
  async create(user: User, comment: number, vote: VOTE): Promise<IVotecomment> {
    const date = new Date().toISOString();
    const data = {
      comment,
      user,
      vote,
      createdAt: date,
      updatedAt: date,
    };
    return await this.repository.save(data);
  }

  async findCommentUpvotes(id: number): Promise<any> {
    const [result, count] = await this.repository
      .createQueryBuilder('commentvotes')
      .where('commentvotes.comment = :id', { id })
      .andWhere('commentvotes.vote = 1')
      .leftJoinAndSelect('commentvotes.user', 'user')
      .getManyAndCount();
    return {
      data: result,
      count,
    };
  }

  async findCommentDownvotes(id: number): Promise<any> {
    const [result, count] = await this.repository
      .createQueryBuilder('commentvotes')
      .where('commentvotes.comment = :id', { id })
      .andWhere('commentvotes.vote = -1')
      .leftJoinAndSelect('commentvotes.user', 'user')
      .getManyAndCount();
    return {
      data: result,
      count,
    };
  }

  async checkUserVotecomment(user: User, commentid: number): Promise<any> {
    const result = await this.repository.findOne({ user, comment: commentid });
    if (result) {
      return { data: result.vote };
    }
    return { data: 0 };
  }
}
