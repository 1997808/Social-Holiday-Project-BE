import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { CreateLikepostDto } from './dto/create-likepost.dto';
import { UpdateLikepostDto } from './dto/update-likepost.dto';
import { Likepost } from './entities/likepost.entity';
import { ILikepost } from './entities/likepost.interface';

@Injectable()
export class LikepostsService extends BaseService<Likepost> {
  constructor(
    @InjectRepository(Likepost) repository: Repository<Likepost>
  ) {
    super(repository)
  }
  async create(createLikepostDto: CreateLikepostDto): Promise<ILikepost> {
    const date = new Date().toISOString();
    let data = {
      ...createLikepostDto,
      createdAt: date,
      updatedAt: date,
    }
    return await this.repository.save(data);
  }
}
