import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { UsersModule } from '../users/users.module';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [UsersModule, MessagesModule],
  controllers: [ChatController],
  providers: [ChatGateway],
})
export class ChatModule {}
