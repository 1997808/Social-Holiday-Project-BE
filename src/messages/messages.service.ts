import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { IMessage } from './entities/message.interface';

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

  async getConversationMessage(conversationid: number) {
    // return this.repository.find({ conversation: conversationid });
    return 0;
  }
}
