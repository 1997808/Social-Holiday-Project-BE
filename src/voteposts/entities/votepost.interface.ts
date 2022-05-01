import { User } from 'src/users/entities/user.entity';

export interface IVotepost {
  id?: number;
  post?: number;
  user?: User;
  vote: number;
}
