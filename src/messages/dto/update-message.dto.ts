import { Conversation } from 'src/conversations/entities/conversation.entity';
import { Participant } from 'src/participants/entities/participant.entity';

export class UpdateMessageDto {
  readonly id: number;
  readonly author: Participant;
  readonly conversation: Conversation;
  readonly content: string;
  readonly status?: string;
  readonly replyTo?: number;
}
