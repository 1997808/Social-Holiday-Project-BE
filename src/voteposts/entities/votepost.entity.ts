import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  // OneToOne,
} from 'typeorm';

@Entity()
export class Votepost {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.id)
  post: Post;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ nullable: true })
  vote: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
