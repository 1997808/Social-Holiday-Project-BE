import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Friendship {
  @PrimaryGeneratedColumn()
  friendshipid: number;

  @Column()
  userid1: number;

  @Column()
  userid2: number;

  @Column()
  requestedDate: Date;

  @Column()
  deniedDate: Date;

  @Column()
  terminationDate: Date;

  @Column()
  approvedDate: Date;
}