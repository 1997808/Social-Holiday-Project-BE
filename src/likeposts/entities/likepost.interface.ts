import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

export interface ILikepost {
  id?: number;
  post?: Post;
  user?: User;
}
