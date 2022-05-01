// import { User } from 'src/users/entities/user.entity';

export class UpdateConversationDto {
  // readonly id: number;
  readonly title?: string;
  readonly participants?: number[];
  // readonly creator: User;
  readonly type?: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
