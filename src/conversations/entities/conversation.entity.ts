import { Message } from 'src/messages/entities/message.entity';
// import { Participant } from 'src/participants/entities/participant.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];

  @Column()
  type: number;

  @OneToMany(() => Message, (Message) => Message.conversation)
  messages: Message[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
