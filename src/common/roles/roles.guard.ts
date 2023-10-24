import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { IUser } from "../../modules/user/user/user.utils";
import { Observable } from "rxjs";
import { Reflector } from '@nestjs/core';
import { RoleEnum } from "./role.enum";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req:Request = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    try {
      const user:IUser = JSON.parse(<string>req.headers['user']);
      return requiredRoles.some((role) => user.roles?.includes(role));
    }catch (e) {
      console.log(e,'error')
    }
    return true
  }
}