import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/post.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { ConversationsModule } from './conversations/conversations.module';
import { ParticipantsModule } from './participants/participants.module';
import { CommentsModule } from './comments/comments.module';
import { FriendshipsModule } from './friendships/friendships.module';
import { NotificationsModule } from './notifications/notifications.module';
import { VotepostsModule } from './voteposts/voteposts.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { EventModule } from './event/event.module';
import { VotecommentsModule } from './votecomments/votecomments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(<string>process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true, // shouldn't be used in production - may lose data
    }),
    PostsModule,
    UsersModule,
    AuthModule,
    MessagesModule,
    ConversationsModule,
    ParticipantsModule,
    CommentsModule,
    FriendshipsModule,
    NotificationsModule,
    VotepostsModule,
    CloudinaryModule,
    EventModule,
    VotecommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
