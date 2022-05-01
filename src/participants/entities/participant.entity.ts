import { Conversation } from 'src/conversations/entities/conversation.entity';
import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.participants)
  conversation: Conversation;

  @Column()
  conversationId: number;

  @ManyToOne(() => User, (user) => user.participants)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];
}
