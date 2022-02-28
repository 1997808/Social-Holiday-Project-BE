export class UpdateMessageDto {
  readonly id: number;
  readonly author: number;
  readonly conversationid: number;
  readonly content: string;
  readonly status?: string;
  readonly replyTo?: number;
}
