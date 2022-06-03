import { Votepost } from 'src/voteposts/entities/votepost.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @Column()
  content: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column('text', { array: true, nullable: true })
  imageUrl: string[];

  @OneToMany(() => Votepost, (votepost) => votepost.post)
  votes: Votepost[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
