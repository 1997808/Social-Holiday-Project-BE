import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class Votecomment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Comment, (comment) => comment.id)
  comment: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ nullable: true })
  vote: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
