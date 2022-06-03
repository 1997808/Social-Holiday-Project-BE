import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { EventService } from './event.service';
import { Socket, Server } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
import { ParticipantsService } from 'src/participants/participants.service';
import { ConversationsService } from 'src/conversations/conversations.service';
import { AuthService } from 'src/auth/auth.service';
import { RES_MESSAGE } from 'src/common/constant';

class HandleMessage {
  content: string;
  conversationId: number;
  userId: number;
}

class HandleConversation {
  prevConversation?: number;
  conversation?: number;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly eventService: EventService,
    private readonly authService: AuthService,
    private readonly messageService: MessagesService,
    private readonly participateService: ParticipantsService,
    private readonly conversationService: ConversationsService,
  ) {}
  @WebSocketServer() server: Server;

  connectedUsers: number[] = [];

  @SubscribeMessage('events')
  handleEvent(payload: string) {
    this.server.emit('clientEvent', { data: 123 });
    return 'absolute nothing';
  }

  @SubscribeMessage('conversationSwitch')
  async conversationSwitch(
    @MessageBody() data: HandleConversation,
    @ConnectedSocket() socket: Socket,
  ) {
    const { prevConversation, conversation } = data;
    socket.rooms.forEach((item) => {
      if (item.includes('conversation')) {
        socket.leave(item);
      }
    });
    if (prevConversation) {
      socket.leave('conversation ' + prevConversation.toString());
    }
    if (conversation) {
      socket.join('conversation ' + conversation.toString());
    }
  }

  @SubscribeMessage('listenMessage')
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

  @SubscribeMessage('handleMessage')
  async saveMessage(@MessageBody() data: HandleMessage) {
    const participant = await this.participateService.findOne({
      userId: data.userId,
      conversationId: data.conversationId,
    });
    const conversation = await this.conversationService.findById(
      data.conversationId,
    );
    if (participant && conversation) {
      const newMessage = await this.messageService.create({
        content: data.content,
        conversation: conversation,
        author: participant,
      });
      const message = await this.messageService.getConversationMessage(
        newMessage.id,
      );
      this.server
        .to('conversation ' + data.conversationId.toString())
        .emit('newMessage', message);
      return { message: RES_MESSAGE.SUCCESS };
    }
    return { message: RES_MESSAGE.FAILED };
  }

  @SubscribeMessage('removeEvent')
  remove(@MessageBody() id: number) {
    return this.eventService.remove(id);
  }

  async handleDisconnect(client: Socket) {
    const user = await this.authService.getUserFromToken(
      client.handshake.auth.token,
    );
    if (user) {
      const userPos = this.connectedUsers.indexOf(user.id);
      if (userPos > -1) {
        this.connectedUsers = [
          ...this.connectedUsers.slice(0, userPos),
          ...this.connectedUsers.slice(userPos + 1),
        ];
        this.server.emit('users', this.connectedUsers);
      }
    }
  }

  async handleConnection(client: Socket) {
    const user = await this.authService.getUserFromToken(
      client.handshake.auth.token,
    );
    if (user) {
      this.connectedUsers = [...this.connectedUsers, user.id];
      this.server.emit('users', this.connectedUsers);
    }
  }
}
