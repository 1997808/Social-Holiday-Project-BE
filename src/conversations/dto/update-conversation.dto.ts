export class UpdateConversationDto {
  readonly conversationid: number;
  readonly title: string;
  readonly creator: number;
  readonly type?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
