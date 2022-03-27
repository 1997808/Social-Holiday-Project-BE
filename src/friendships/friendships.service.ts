import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
// import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { Friendship } from './entities/friendship.entity';
import { IFriendship } from './entities/friendship.interface';

@Injectable()
export class FriendshipsService extends BaseService<Friendship> {
  constructor(
    @InjectRepository(Friendship) repository: Repository<Friendship>,
  ) {
    super(repository);
  }
  async create(
    user,
    createFriendshipDto: CreateFriendshipDto,
  ): Promise<IFriendship> {
    const date = new Date().toISOString();
    const data = {
      creator: user.id,
      ...createFriendshipDto,
      status: 'Pending',
      createdAt: date,
      updatedAt: date,
    };
    return await this.repository.save(data);
  }

  checkExistedFriendRequest(creatorId: number, receiverId: number): boolean {
    const result = this.repository.findOne({
      where: [
        { creator: creatorId, receiver: receiverId },
        { creator: receiverId, receiver: creatorId },
      ],
    });
    if (result) return true;
    return false;
  }

  async findPendingFriendRequest(userId: any) {
    return await this.repository.find({
      where: [{ receiver: userId }],
      relations: ['creator'],
    });
  }
}
