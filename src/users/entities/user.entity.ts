import { Conversation } from 'src/conversations/entities/conversation.entity';
import { Friendship } from 'src/friendships/entities/friendship.entity';
import { Likepost } from 'src/likeposts/entities/likepost.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Participant } from 'src/participants/entities/participant.entity';
import { Post } from 'src/posts/entities/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  profile: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ nullable: true })
  profilePictureUrl: string;

  @Column({ nullable: true })
  cloudinaryId: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Friendship, (friendship) => friendship.creator)
  sentFriendRequests: Friendship[];

  @OneToMany(() => Friendship, (friendship) => friendship.receiver)
  receivedFriendRequests: Friendship[];

  // @OneToMany(() => Conversation, (conversation) => conversation.creator)
  // conversations: Conversation[];

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];

  @ManyToMany(() => Participant, (participant) => participant.userid)
  participants: Participant[];

  @ManyToMany(() => Likepost, (likepost) => likepost.userid)
  likeposts: Likepost[];
}
