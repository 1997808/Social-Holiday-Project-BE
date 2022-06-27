import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventGateway } from './event.gateway';
import { MessagesModule } from 'src/messages/messages.module';
import { ParticipantsModule } from 'src/participants/participants.module';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { AuthModule } from 'src/auth/auth.module';
import { PostsModule } from 'src/posts/post.module';

@Module({
  imports: [
    MessagesModule,
    ParticipantsModule,
    ConversationsModule,
    AuthModule,
    PostsModule,
  ],
  providers: [EventGateway, EventService],
  exports: [EventGateway],
})
export class EventModule {}
