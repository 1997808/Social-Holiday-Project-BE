export class CreateFriendshipDto {
  creator?: number;
  receiver: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
