import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventGateway } from './event.gateway';
import { MessagesModule } from 'src/messages/messages.module';
import { ParticipantsModule } from 'src/participants/participants.module';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MessagesModule,
    ParticipantsModule,
    ConversationsModule,
    AuthModule,
  ],
  providers: [EventGateway, EventService],
})
export class EventModule {}
