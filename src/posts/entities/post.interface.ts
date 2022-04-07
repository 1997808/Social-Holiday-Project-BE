import { User } from 'src/users/entities/user.entity';

export interface IPost {
  id: number;
  author: User;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string[];
}
