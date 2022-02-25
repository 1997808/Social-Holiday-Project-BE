import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Likecomment {
  @PrimaryGeneratedColumn()
  likecommentid: number;

  @Column()
  commentid: number;

  @Column()
  userid: number;
}
