import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { MessagesService } from '../messages/messages.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ChatGateway } from './chat.gateway';
import { ApiUser } from 'src/users/users.decorator';
import { JWTPayload } from 'src/auth/auth.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateProfileDTO } from './chat.dto';

@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService,
    private readonly chatGateway: ChatGateway,
  ) {}

  @Get('messages')
  getMessages() {
    return this.messagesService.findAll();
  }

  @Get('users')
  getConnectedUsers(@ApiUser() user: JWTPayload) {
    return this.chatGateway
      .getConnectedUsersList()
      .filter((connectedUser) => connectedUser.id !== user.id);
  }

  @Patch('profile')
  async updateProfile(
    @ApiUser() user: JWTPayload,
    @Body() body: UpdateProfileDTO,
  ) {
    return this.usersService.update(user.id, body);
  }
}
