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
  id: number;

  @Column()
  commentid: number;

  @Column()
  userid: number;
}
