import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;

  @ManyToOne(() => User, (user) => user.conversations)
  creator: User;

  @Column()
  type: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
