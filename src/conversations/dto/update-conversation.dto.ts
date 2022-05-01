export class UpdateConversationDto {
  // readonly id: number;
  readonly title?: string;
  readonly participants?: number[];
  readonly type?: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
