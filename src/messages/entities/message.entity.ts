import { Conversation } from 'src/conversations/entities/conversation.entity';
import { Participant } from 'src/participants/entities/participant.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Participant, (author) => author.messages)
  author: Participant;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @Column()
  content: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => Message, (message) => message.id, { nullable: true })
  replyTo: number;
}
