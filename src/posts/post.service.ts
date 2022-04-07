import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
import { Like, Repository } from 'typeorm';
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

    const [result, total] = await this.repository.findAndCount({
      order: { createdAt: 'DESC' },
      take,
      skip,
      relations: ['author'],
    });

    return {
      data: result,
      count: total,
    };
  }
}
