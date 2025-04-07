import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import {
  createMessageSchema,
  CreateMessageDto,
} from '../messages/messages.dto';
import { MessagesService } from '../messages/messages.service';
import { ZodValidationPipe } from 'src/zod.pipe';
import { JWTPayload } from 'src/auth/auth.dto';
import { WsUser } from 'src/users/users.decorator';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly jwtService: JwtService,
  ) {}

  private connectedUsers: Map<string, JWTPayload> = new Map();

  getConnectedUsersList(): JWTPayload[] {
    return Array.from(this.connectedUsers.values());
  }

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      const user = this.jwtService.verify(token);
      if (!user) throw new Error('Invalid token');

      client.data.user = user;
      this.connectedUsers.set(client.id, user);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.server.emit('userConnected', user);
      console.log(`${user.nickname} (${user.username}) joined the chat`);
    } catch (error) {
      client.disconnect();
      console.error('Connection error:', error);
    }
  }

  handleDisconnect(client: Socket) {
    const user = client.data.user as JWTPayload;
    if (user) {
      this.connectedUsers.delete(client.id);
      this.server.emit('userDisconnected', user);
      console.log(`${user.nickname} (${user.username}) left the chat`);
    } else {
      console.log('Client disconnected without a user');
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @WsUser() user: JWTPayload,
    @MessageBody(new ZodValidationPipe(createMessageSchema))
    body: CreateMessageDto,
  ) {
    const newMessage = await this.messagesService.create(body, user.id);
    this.server.emit('newMessage', newMessage);
    console.log(`${user.nickname} (${user.username}): ${newMessage.content}`);
  }
}
