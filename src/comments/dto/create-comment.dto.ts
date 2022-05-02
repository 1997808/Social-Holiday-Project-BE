export class CreateCommentDto {
  post: number;
  content: string;
  replyTo?: number;
}
