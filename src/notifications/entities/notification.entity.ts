import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  notificationid: number;

  @Column()
  userid: number;

  @Column()
  content: string;

  @Column()
  contentUrl: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}