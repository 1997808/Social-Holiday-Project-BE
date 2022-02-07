import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { Friendship } from './entities/friendship.entity';
import { IFriendship } from './entities/friendship.interface';

@Injectable()
export class FriendshipsService extends BaseService<Friendship> {
  constructor(
    @InjectRepository(Friendship) repository: Repository<Friendship>
  ) {
    super(repository)
  }
  async create(createFriendshipDto: CreateFriendshipDto): Promise<IFriendship> {
    const date = new Date().toISOString();
    let data = {
      ...createFriendshipDto,
      createdAt: date,
      updatedAt: date,
    }
    return await this.repository.save(data);
  }
}
