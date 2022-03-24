import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Likecomment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ManyToOne(() => Comment, (comment) => comment.id)
  commentid: number;

  @Column()
  @ManyToMany(() => User, (user) => user.id)
  userid: number;
}
