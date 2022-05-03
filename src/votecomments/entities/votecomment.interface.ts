import { User } from 'src/users/entities/user.entity';

export interface IVotecomment {
  id?: number;
  post?: number;
  user?: User;
  vote: number;
}
