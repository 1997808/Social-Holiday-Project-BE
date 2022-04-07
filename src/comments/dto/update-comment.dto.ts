export class UpdateCommentDto {
  readonly id: number;
  readonly author: number;
  readonly postid: number;
  readonly content: string;
  // createdAt: Date;
  // updatedAt: Date;
  readonly replyTo: number;
}
