import { Conversation } from 'src/conversations/entities/conversation.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ManyToOne(() => User, (user) => user.id)
  author: number;

  @Column()
  @ManyToOne(() => Conversation, (conversation) => conversation.id)
  conversationid: number;

  @Column()
  content: string;

  @Column()
  status: string;

  // @Column('int', { array: true })
  // read_participant: number[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ nullable: true })
  @ManyToOne(() => User, (user) => user.id)
  replyTo: number;
}
