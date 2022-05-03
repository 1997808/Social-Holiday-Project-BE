import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Votecomment } from 'src/votecomments/entities/votecomment.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  author: User;

  @ManyToOne(() => Post, (post) => post.id)
  post: number;

  @Column()
  content: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => Votecomment, (votecomment) => votecomment.comment)
  votes: Votecomment[];

  @Column({ nullable: true })
  replyTo: number;
}
