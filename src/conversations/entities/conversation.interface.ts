// import { User } from 'src/users/entities/user.entity';

export interface IConversation {
  id?: number;
  title?: string;
  participants?: number[];
  type?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
