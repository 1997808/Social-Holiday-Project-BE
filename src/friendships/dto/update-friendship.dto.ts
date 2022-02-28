export class UpdateFriendshipDto {
  readonly id: number;
  readonly userid1: number;
  readonly userid2: number;
  // requestedDate: Date;
  readonly deniedDate?: Date;
  // terminationDate: Date;
  readonly approvedDate?: Date;
}
