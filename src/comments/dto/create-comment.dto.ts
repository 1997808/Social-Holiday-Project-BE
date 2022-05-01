export class CreateCommentDto {
  id: number;
  author: number;
  postid: number;
  content: string;
  replyTo: number;
}
