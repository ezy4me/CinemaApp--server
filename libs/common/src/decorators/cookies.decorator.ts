import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Cookie = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const requst = ctx.switchToHttp().getRequest();
    return key && key in requst.cookies ? requst.cookies[key] : requst.cookies;
  },
);
