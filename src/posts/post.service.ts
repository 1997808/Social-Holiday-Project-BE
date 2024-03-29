import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Repository } from 'typeorm';
import { IPost } from './entities/post.interface';
import { Post } from './entities/post.entity';
import { BaseService } from 'src/common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostService extends BaseService<Post> {
  constructor(@InjectRepository(Post) repository: Repository<Post>) {
    super(repository);
  }

  async create(user: User, createPostDto: CreatePostDto): Promise<IPost> {
    const date = new Date().toISOString();
    const data = {
      ...createPostDto,
      author: user,
      createdAt: date,
      updatedAt: date,
    };
    return await this.repository.save(data);
  }

  async findAllPost(query): Promise<any> {
    const take = query ? query.take : 20;
    const skip = query ? query.skip : 0;

    const [result, count] = await this.repository.findAndCount({
      order: { createdAt: 'DESC' },
      take,
      skip,
      relations: ['author', 'votes', 'comments'],
    });

    return {
      data: result,
      count: count,
    };
  }

  // async getGlobalPost(
  //   query: MessageQueryDto,
  // ): Promise<IMessagePaginate> {
  //   const take = query.take || 15;
  //   const page = query.page || 1;
  //   const skipSocket = query.skipSocket || 0;
  //   const skip = (page - 1) * take + skipSocket;

  //   const [result, total] = await this.repository
  //     .createQueryBuilder('post')
  //     .leftJoinAndSelect('post.author', 'author')
  //     .leftJoinAndSelect('post.votes', 'votes')
  //     .leftJoinAndSelect('post.comments', 'comments')
  //     .orderBy('post.createdAt', 'DESC')
  //     .skip(skip)
  //     .take(take)
  //     .getManyAndCount();

  //   return {
  //     data: result,
  //     count: total,
  //   };
  // }

  async findPostDetail(id: number): Promise<Post> {
    const result = await this.repository.findOne({
      where: [{ id: id }],
      relations: ['author', 'votes', 'comments'],
    });

    return result;
  }

  async findProfilePost(query, userId): Promise<any> {
    const take = query ? query.take : 20;
    const skip = query ? query.skip : 0;

    const [result, count] = await this.repository.findAndCount({
      where: { author: userId },
      order: { createdAt: 'DESC' },
      take,
      skip,
      relations: ['author', 'votes', 'comments'],
    });

    return {
      data: result,
      count: count,
    };
  }
}
