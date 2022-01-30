import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { IPost } from './entities/post.interface';
import { Post } from './entities/post.entity';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class PostService extends BaseService<Post, Repository<Post>> {
  constructor(repository: Repository<Post>) {
    super(repository)
  }

  async create(createPostDto: CreatePostDto): Promise<IPost> {
    const date = new Date().toISOString();
    let data = {
      ...createPostDto,
      createdAt: date,
      updatedAt: date,
    }
    return await this.repository.save(data);
  }
}
