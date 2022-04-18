import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { EventService } from './event.service';
// import { CreateEventDto } from './dto/create-event.dto';
// import { UpdateEventDto } from './dto/update-event.dto';
import { Socket, Server } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
import { ParticipantsService } from 'src/participants/participants.service';
import { ConversationsService } from 'src/conversations/conversations.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly eventService: EventService,
    private readonly messageService: MessagesService,
    private readonly participateService: ParticipantsService,
    private readonly conversationService: ConversationsService,
  ) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('events')
  handleEvent(payload: string) {
    console.log('client doin something');
    this.server.emit('clientEvent', { data: 123 });
    return 'absolute nothing';
  }

  // @SubscribeMessage('createEvent')
  // create(@MessageBody() createEventDto: CreateEventDto) {
  //   return this.eventService.create(createEventDto);
  // }

  @SubscribeMessage('findAllEvent')
  findAll() {
    return this.eventService.findAll();
  }

  // @SubscribeMessage('updateEvent')
  // update(@MessageBody() updateEventDto: UpdateEventDto) {
  //   return this.eventService.update(updateEventDto.id, updateEventDto);
  // }

  @SubscribeMessage('removeEvent')
  remove(@MessageBody() id: number) {
    return this.eventService.remove(id);
  }

  afterInit(server: Server) {
    console.log('Init');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(client.handshake.headers.cookie);
  }
}
