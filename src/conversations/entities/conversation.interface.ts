import { User } from 'src/users/entities/user.entity';

export interface IConversation {
  id: number;
  title?: string;
  paricipant?: number[];
  // type: string;
  createdAt: Date;
  updatedAt: Date;
}
