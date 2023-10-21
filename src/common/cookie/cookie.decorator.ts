import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const Cookies = createParamDecorator(
  (cookieKey: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return cookieKey ? request.cookies?.[cookieKey] : request.cookies;
  },
);