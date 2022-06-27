import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  userid: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  contentUrl: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
