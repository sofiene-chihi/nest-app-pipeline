import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserPayload } from './interfaces/currentUser.payload';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
