import { Conversation } from 'src/conversations/entities/conversation.entity';

export interface IMessage {
  id: number;
  author: number;
  conversation: Conversation;
  content: string;
  // status: string;
  createdAt: Date;
  updatedAt: Date;
  replyTo?: number;
}
