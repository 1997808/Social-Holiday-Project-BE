import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { FRIENDSHIP_STATUS } from 'src/common/constant';
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
      status: FRIENDSHIP_STATUS.PENDING,
      createdAt: date,
      updatedAt: date,
    };
    return await this.repository.save(data);
  }

  async checkExistedFriendRequest(
    creatorId: number,
    receiverId: number,
  ): Promise<Friendship> {
    return await this.repository.findOne({
      where: [
        {
          creator: creatorId,
          receiver: receiverId,
          status: FRIENDSHIP_STATUS.PENDING,
        },
        {
          creator: receiverId,
          receiver: creatorId,
          status: FRIENDSHIP_STATUS.PENDING,
        },
      ],
    });
  }

  async findPendingFriendRequest(userId: number) {
    return await this.repository.find({
      where: [{ receiver: userId, status: FRIENDSHIP_STATUS.PENDING }],
      relations: ['creator'],
    });
  }

  async findPendingSentFriendRequest(userId: number) {
    return await this.repository.find({
      where: [{ creator: userId, status: FRIENDSHIP_STATUS.PENDING }],
      relations: ['receiver'],
    });
  }

  async checkUserIsCreator(
    friendRequestId: number,
    userId: number,
  ): Promise<boolean> {
    const result = await this.repository.findOne({
      where: [{ id: friendRequestId }, { creator: userId }],
    });
    if (result) return true;
    return false;
  }

  async checkUserIsReceiver(
    friendRequestId: number,
    userId: number,
  ): Promise<boolean> {
    const result = await this.repository.findOne({
      where: [{ id: friendRequestId }, { receiver: userId }],
    });
    if (result) return true;
    return false;
  }

  async acceptFriendRequest(friendRequestId: number) {
    return await this.repository.update(
      { id: friendRequestId },
      { status: FRIENDSHIP_STATUS.ACCEPTED },
    );
  }

  async declineFriendRequest(friendRequestId: number) {
    return await this.repository.update(
      { id: friendRequestId },
      { status: FRIENDSHIP_STATUS.DECLINED },
    );
  }

  async cancelFriendRequest(friendRequestId: number) {
    return await this.repository.update(
      { id: friendRequestId },
      { status: FRIENDSHIP_STATUS.CANCEL },
    );
  }

  async findFriend(userId: number) {
    let data = [];
    data = await this.repository.find({
      where: [
        { creator: userId, status: FRIENDSHIP_STATUS.ACCEPTED },
        { receiver: userId, status: FRIENDSHIP_STATUS.ACCEPTED },
      ],
      relations: ['creator', 'receiver'],
    });
    const result = [];
    data.forEach((friend) => {
      if (friend.creator.id === userId) {
        result.push(friend.receiver);
      } else if (friend.receiver.id === userId) {
        result.push(friend.creator);
      }
    });
    return result;
  }

  async checkUserFriendRequestStatus(creatorId: number, receiverId: number) {
    const data = await this.repository.findOne({
      where: [
        { creator: creatorId, receiver: receiverId },
        { creator: receiverId, receiver: creatorId },
      ],
    });
    if (data) {
      return data.status;
    } else {
      return FRIENDSHIP_STATUS.NULL;
    }
  }
}
