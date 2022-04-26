import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { CreateMessageDto, MessageQueryDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { IMessage, IMessagePaginate } from './entities/message.interface';

@Injectable()
export class MessagesService extends BaseService<Message> {
  constructor(@InjectRepository(Message) repository: Repository<Message>) {
    super(repository);
  }
  async create(createMessageDto: CreateMessageDto): Promise<IMessage> {
    const date = new Date().toISOString();
    const data = {
      ...createMessageDto,
      createdAt: date,
      updatedAt: date,
    };
    return await this.repository.save(data);
  }

  async getConversationMessage(
    query: MessageQueryDto,
  ): Promise<IMessagePaginate> {
    console.log(query);
    const { conversationId } = query;
    const take = query.take || 15;
    const page = query.page || 1;
    const skipSocket = query.skipSocket || 0;
    const skip = (page - 1) * take + skipSocket;

    const [result, total] = await this.repository
      .createQueryBuilder('message')
      .where('message.conversation.id = :conversationId', { conversationId })
      .leftJoinAndSelect('message.author', 'participants')
      .leftJoinAndSelect('participants.user', 'user')
      .orderBy('message.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return {
      data: result,
      count: total,
    };
  }
}
