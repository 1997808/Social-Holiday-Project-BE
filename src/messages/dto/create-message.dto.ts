import { Conversation } from 'src/conversations/entities/conversation.entity';
import { Participant } from 'src/participants/entities/participant.entity';

export class CreateMessageDto {
  author: Participant;
  conversation: Conversation;
  content: string;
  // status?: string;
  replyTo?: number;
}
