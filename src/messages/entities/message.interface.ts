export interface IMessage {
  id: number;
  author: number;
  conversationid: number;
  content: string;
  // status: string;
  createdAt: Date;
  updatedAt: Date;
  replyTo?: number;
}
