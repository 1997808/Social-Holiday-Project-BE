import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  conversationid: number;

  @Column()
  title: string;

  @Column()
  creator: number;

  @Column()
  type: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
