import { Message } from 'src/messages/entities/message.entity';
import { Participant } from 'src/participants/entities/participant.entity';

export interface IConversation {
  id?: number;
  title?: string;
  participants?: Participant[];
  type?: number;
  message?: Message[];
  createdAt?: Date;
  updatedAt?: Date;
}
