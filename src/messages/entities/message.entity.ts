import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: number;

  @Column()
  conversationid: number;

  @Column()
  content: string;

  @Column()
  status: string;

  @Column('int', { array: true })
  read_participant: number[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  replyTo: number;
}
