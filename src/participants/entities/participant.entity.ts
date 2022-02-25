import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  participantid: number;

  @Column()
  conversationid: number;

  @Column()
  userid: number;
}
