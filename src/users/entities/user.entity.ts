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

  @Column()
  profile: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  profilePictureUrl: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  // @OneToMany(
  //   () => FriendRequestEntity,
  //   (friendRequestEntity) => friendRequestEntity.creator,
  // )
  // sentFriendRequests: FriendRequestEntity[];

  // @OneToMany(
  //   () => FriendRequestEntity,
  //   (friendRequestEntity) => friendRequestEntity.receiver,
  // )
  // receivedFriendRequests: FriendRequestEntity[];

  // @ManyToMany(
  //   () => ConversationEntity,
  //   (conversationEntity) => conversationEntity.users,
  // )
  // conversations: ConversationEntity[];

  // @OneToMany(() => MessageEntity, (messageEntity) => messageEntity.user)
  // messages: MessageEntity[];
}
