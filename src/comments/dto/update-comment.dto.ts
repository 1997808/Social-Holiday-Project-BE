export class UpdateCommentDto {
  readonly id: number;
  readonly author: number;
  readonly postid: number;
  readonly content: string;
  readonly replyTo: number;
}
