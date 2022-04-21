import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { EventService } from './event.service';
// import { CreateEventDto } from './dto/create-event.dto';
// import { UpdateEventDto } from './dto/update-event.dto';
import { Socket, Server } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
import { ParticipantsService } from 'src/participants/participants.service';
import { ConversationsService } from 'src/conversations/conversations.service';
import { AuthService } from 'src/auth/auth.service';

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
    private readonly authService: AuthService,
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

  @SubscribeMessage('createEvent')
  async listenForMessage(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const author = await this.authService.getUserFromToken(
      socket.handshake.auth.token,
    );
    return this.server.sockets.emit('receiveMessage', { data, author });
  }

  @SubscribeMessage('getAllMessage')
  async getAllMessage() {
    //get all message from conversation
    return this.messageService.findAll();
  }

  async saveMessage(content: string, author: number, conversationid: number) {
    const conversation = await this.conversationService.findById(
      conversationid,
    );
    const participant = await this.participateService.findOne({
      userId: author,
    });
    const newMessage = await this.messageService.create({
      content,
      conversation,
      author: participant,
    });
    return newMessage;
  }

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

  async handleConnection(client: Socket, ...args: any[]) {
    await this.authService.getUserFromToken(client.handshake.auth.token);
  }
}
