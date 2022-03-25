import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  Column,
} from 'typeorm';

@Entity()
export class Likepost {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  @ManyToOne(() => Post, (post) => post.id)
  postid: number;

  // @Column()
  @ManyToMany(() => User, (user) => user.id)
  userid: number;
}
