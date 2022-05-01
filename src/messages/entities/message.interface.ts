import { Conversation } from 'src/conversations/entities/conversation.entity';
import { Participant } from 'src/participants/entities/participant.entity';

export interface IMessage {
  id: number;
  author: Participant;
  conversation: Conversation;
  content: string;
  // status: string;
  createdAt: Date;
  updatedAt: Date;
  replyTo?: number;
}

export interface IMessagePaginate {
  data: IMessage[];
  count: number;
}
