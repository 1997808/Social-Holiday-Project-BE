export class CreateMessageDto {
  author: number;
  conversationid: number;
  content: string;
  // status?: string;
  replyTo?: number;
}
