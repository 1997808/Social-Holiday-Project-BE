import { Conversation } from 'src/conversations/entities/conversation.entity';

export class UpdateMessageDto {
  readonly id: number;
  readonly author: number;
  readonly conversation: Conversation;
  readonly content: string;
  readonly status?: string;
  readonly replyTo?: number;
}
