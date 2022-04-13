import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

export interface IVotepost {
  id?: number;
  post?: Post;
  user?: User;
  vote: number;
}
