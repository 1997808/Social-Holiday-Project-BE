export class CreateFriendshipDto {
  id: number;
  creator: number;
  receiver: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
