import { Message } from 'src/messages/entities/message.entity';
import { Participant } from 'src/participants/entities/participant.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;

  @OneToMany(() => Participant, (paricipant) => paricipant.conversation)
  participants: Participant[];

  @Column()
  type: number;

  @OneToMany(() => Message, (Message) => Message.conversation)
  messages: Message[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
