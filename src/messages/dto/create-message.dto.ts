export class CreateMessageDto {
  messageid: number;
  author: number;
  conversationid: number;
  content: string;
  status?: string;
  replyTo?: number;
}
