export class UpdateFriendshipDto {
  readonly id: number;
  readonly userid1: number;
  readonly userid2: number;
  readonly status: string;
  // requestedDate: Date;
  readonly deniedDate?: Date;
  // terminationDate: Date;
  readonly approvedDate?: Date;
}
