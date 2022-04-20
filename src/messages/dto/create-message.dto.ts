import { Conversation } from 'src/conversations/entities/conversation.entity';

export class CreateMessageDto {
  author: number;
  conversation: Conversation;
  content: string;
  // status?: string;
  replyTo?: number;
}
