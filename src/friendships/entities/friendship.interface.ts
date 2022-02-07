export interface IFriendship {
  friendshipid: number;
  userid1: number;
  userid2: number;
  requestedDate: Date;
  deniedDate: Date;
  terminationDate: Date;
  approvedDate: Date;
}