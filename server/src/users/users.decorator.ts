import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JWTPayload } from 'src/auth/auth.dto';

export const ApiUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JWTPayload;
  },
);

export const WsUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const client = ctx.switchToWs().getClient<Socket>();
    return client.data.user as JWTPayload;
  },
);
