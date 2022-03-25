import { User } from 'src/users/entities/user.entity';

export class CreateConversationDto {
  id: number;
  title: string;
  creator: User;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
