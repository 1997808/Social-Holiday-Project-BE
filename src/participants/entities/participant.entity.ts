import { Conversation } from 'src/conversations/entities/conversation.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ManyToOne(() => Conversation, (conversation) => conversation.id)
  conversationid: number;

  @Column()
  @ManyToMany(() => User, (user) => user.id)
  userid: number;
}
