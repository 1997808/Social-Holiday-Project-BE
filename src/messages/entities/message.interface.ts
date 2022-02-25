export interface IMessage {
  messageid: number;
  author: number;
  conversationid: number;
  content: string;
  status: string;
  read_participant: number[];
  createdAt: Date;
  updatedAt: Date;
  replyTo: number;
}
