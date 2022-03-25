import { Conversation } from 'src/conversations/entities/conversation.entity';
import { Friendship } from 'src/friendships/entities/friendship.entity';
import { Post } from 'src/posts/entities/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
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

  @Column()
  password: string;

  @Column({ nullable: true })
  profile: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ nullable: true })
  profilePictureUrl: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Friendship, (friendship) => friendship.creator)
  sentFriendRequests: Friendship[];

  @OneToMany(() => Friendship, (friendship) => friendship.receiver)
  receivedFriendRequests: Friendship[];

  @OneToMany(() => Conversation, (conversation) => conversation.creator)
  conversations: Conversation[];

  // @OneToMany(() => MessageEntity, (messageEntity) => messageEntity.user)
  // messages: MessageEntity[];
}
