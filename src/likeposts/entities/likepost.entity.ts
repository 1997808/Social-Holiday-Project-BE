import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Likepost {
  @PrimaryGeneratedColumn()
  likeid: number;

  @Column()
  postid: number;

  @Column()
  userid: number;
}