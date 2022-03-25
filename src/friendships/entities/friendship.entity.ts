import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Friendship {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  @ManyToOne(() => User, (user) => user.id)
  userid1: number;

  // @Column()
  @ManyToOne(() => User, (user) => user.id)
  userid2: number;

  @Column()
  status: string;

  @Column()
  requestedDate: Date;

  @Column()
  deniedDate: Date;

  @Column()
  terminationDate: Date;

  @Column()
  approvedDate: Date;
}
