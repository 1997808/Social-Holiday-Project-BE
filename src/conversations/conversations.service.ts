import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { IConversation } from './entities/conversation.interface';

@Injectable()
export class ConversationsService extends BaseService<Conversation> {
  constructor(
    @InjectRepository(Conversation) repository: Repository<Conversation>,
  ) {
    super(repository);
  }
  async create(createConversationDto): Promise<IConversation> {
    const date = new Date().toISOString();
    const data = {
      ...createConversationDto,
      createdAt: date,
      updatedAt: date,
    };
    return await this.repository.save(data);
  }

  async findConversationByIds(conversationIds: number[]): Promise<any> {
    const result = await this.repository.findByIds(conversationIds, {
      relations: ['participants', 'participants.user'],
    });
    return result;
  }

  async findConversation(id: number): Promise<Conversation> {
    const result = await this.repository.findOne(
      { id },
      {
        relations: ['participants', 'participants.user'],
      },
    );
    return result;
  }
}
