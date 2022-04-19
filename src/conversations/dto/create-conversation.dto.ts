import { User } from 'src/users/entities/user.entity';

export class CreateConversationDto {
  // id: number;
  title?: string;
  participants?: User[];
  // creator: User;
  type?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
