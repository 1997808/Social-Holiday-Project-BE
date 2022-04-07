import { Conversation } from 'src/conversations/entities/conversation.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  author: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.id)
  conversationid: number;

  @Column()
  content: string;

  // @Column()
  // status: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => Message, (message) => message.id, { nullable: true })
  replyTo: number;
}
