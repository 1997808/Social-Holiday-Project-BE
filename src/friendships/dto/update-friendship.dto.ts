export class UpdateFriendshipDto {
  id: number;
  creator?: number;
  receiver?: number;
  status: string;
}
