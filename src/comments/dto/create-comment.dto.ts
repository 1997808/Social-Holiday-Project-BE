export class CreateCommentDto {
  post: number;
  content: string;
  replyTo?: number;
}

export class CommentQueryDto {
  readonly take?: number;
  readonly page?: number;
  readonly skipSocket?: number; //comment got by listen socket
  readonly postId?: number;
}
