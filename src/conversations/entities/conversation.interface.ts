import { User } from 'src/users/entities/user.entity';

export interface IConversation {
  id: number;
  title: string;
  creator: User;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
