export interface IFriendship {
  id: number;
  userid1: number;
  userid2: number;
  status: string;
  requestedDate: Date;
  deniedDate: Date;
  terminationDate: Date;
  approvedDate: Date;
}
