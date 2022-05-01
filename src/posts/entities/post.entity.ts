import { Votepost } from 'src/voteposts/entities/votepost.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
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

  // @OneToMany(() => Votepost, (votepost) => (votepost.post, votepost.vote == 1))
  // upvotes: Votepost[];

  // @OneToMany(() => Votepost, (votepost) => (votepost.post, votepost.vote == -1))
  // downvotes: Votepost[];
}
