import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { CreateLikecommentDto } from './dto/create-likecomment.dto';
import { UpdateLikecommentDto } from './dto/update-likecomment.dto';
import { Likecomment } from './entities/likecomment.entity';
import { ILikecomment } from './entities/likecomment.interface';

@Injectable()
export class LikecommentsService extends BaseService<Likecomment> {
  constructor(
    @InjectRepository(Likecomment) repository: Repository<Likecomment>,
  ) {
    super(repository);
  }
  async create(
    createLikecommentDto: CreateLikecommentDto,
  ): Promise<ILikecomment> {
    const date = new Date().toISOString();
    const data = {
      ...createLikecommentDto,
      createdAt: date,
      updatedAt: date,
    };
    return await this.repository.save(data);
  }
}
