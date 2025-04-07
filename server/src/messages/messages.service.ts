import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './messages.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly messageSelect: Prisma.MessageSelect = {
    id: true,
    content: true,
    createdAt: true,
    user: {
      select: {
        id: true,
        nickname: true,
      },
    },
  };

  async create(createMessageDto: CreateMessageDto, userId: string) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) throw new NotFoundException('User not found');

    return this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        userId,
      },
      select: this.messageSelect,
    });
  }

  findAll() {
    return this.prisma.message.findMany({
      orderBy: { createdAt: 'asc' },
      select: this.messageSelect,
    });
  }
}
