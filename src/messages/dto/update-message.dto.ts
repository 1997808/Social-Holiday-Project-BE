export class UpdateMessageDto {
  readonly messageid: number;
  readonly author: number;
  readonly conversationid: number;
  readonly content: string;
  readonly status?: string;
  readonly replyTo?: number;
}
