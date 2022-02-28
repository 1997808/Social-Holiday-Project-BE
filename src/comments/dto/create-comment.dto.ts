export class CreateCommentDto {
  id: number;
  author: number;
  postid: number;
  content: string;
  // createdAt: Date;
  // updatedAt: Date;
  replyTo: number;
}
