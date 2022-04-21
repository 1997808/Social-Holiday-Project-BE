import { Conversation } from 'src/conversations/entities/conversation.entity';
import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';

export interface IParticipant {
  id: number;
  conversation?: Conversation;
  conversationId?: number;
  user?: User;
  userId?: number;
  messages?: Message[];
}
