import { User } from 'src/users/entities/user.entity';

export class UpdateConversationDto {
  readonly id: number;
  readonly title: string;
  readonly creator: User;
  readonly type?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
