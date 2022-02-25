export class UpdateCommentDto {
  readonly messageid: number;
  readonly author: number;
  readonly postid: number;
  readonly content: string;
  // createdAt: Date;
  // updatedAt: Date;
  readonly replyTo: number;
}
