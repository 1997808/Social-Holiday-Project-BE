export class UpdateConversationDto {
  readonly id: number;
  readonly title: string;
  readonly creator: number;
  readonly type?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
