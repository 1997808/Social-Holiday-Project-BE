import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { VOTE } from 'src/common/constant';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Votepost } from './entities/votepost.entity';
import { IVotepost } from './entities/votepost.interface';

@Injectable()
export class VotepostsService extends BaseService<Votepost> {
  constructor(@InjectRepository(Votepost) repository: Repository<Votepost>) {
    super(repository);
  }
  async create(user: User, post: number, vote: VOTE): Promise<IVotepost> {
    const date = new Date().toISOString();
    const data = {
      post,
      user,
      vote,
      createdAt: date,
      updatedAt: date,
    };
    return await this.repository.save(data);
  }

  async findPostUpvotes(id: number): Promise<any> {
    const [result, count] = await this.repository
      .createQueryBuilder('postvotes')
      .where('postvotes.post = :id', { id })
      .andWhere('postvotes.vote = 1')
      .leftJoinAndSelect('postvotes.user', 'user')
      .getManyAndCount();
    return {
      data: result,
      count,
    };
  }

  async findPostDownvotes(id: number): Promise<any> {
    const [result, count] = await this.repository
      .createQueryBuilder('postvotes')
      .where('postvotes.post = :id', { id })
      .andWhere('postvotes.vote = -1')
      .leftJoinAndSelect('postvotes.user', 'user')
      .getManyAndCount();
    return {
      data: result,
      count,
    };
  }

  async checkUserVotepost(user: User, postid: number): Promise<any> {
    const result = await this.repository.findOne({ user, post: postid });
    if (result) {
      return { data: result.vote };
    }
    return { data: 0 };
  }
}
