export interface IFriendship {
  id: number;
  creator: number;
  receiver: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
