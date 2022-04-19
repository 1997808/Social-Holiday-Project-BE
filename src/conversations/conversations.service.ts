import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { IConversation } from './entities/conversation.interface';

@Injectable()
export class ConversationsService extends BaseService<Conversation> {
  constructor(
    @InjectRepository(Conversation) repository: Repository<Conversation>,
  ) {
    super(repository);
  }
  async create(
    createConversationDto: CreateConversationDto,
  ): Promise<IConversation> {
    const date = new Date().toISOString();
    const data = {
      ...createConversationDto,
      createdAt: date,
      updatedAt: date,
    };
    return await this.repository.save(data);
  }
}
