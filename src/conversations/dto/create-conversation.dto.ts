// import { User } from 'src/users/entities/user.entity';

export class CreateConversationDto {
  id: number;
  title: string;
  paricipant?: number[];
  // creator: User;
  // type: string;
  createdAt: Date;
  updatedAt: Date;
}
