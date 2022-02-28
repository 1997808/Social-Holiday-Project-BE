export class CreateMessageDto {
  id: number;
  author: number;
  conversationid: number;
  content: string;
  status?: string;
  replyTo?: number;
}
