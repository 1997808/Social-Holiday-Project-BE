import { User } from 'src/users/entities/user.entity';

export interface IComment {
  id: number;
  author: User;
  post: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  replyTo: number;
}

export interface ICommentPaginate {
  data: IComment[];
  count: number;
}
