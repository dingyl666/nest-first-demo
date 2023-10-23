import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { IUser } from "../../modules/user/user/user.utils";
import { Observable } from "rxjs";
import { Reflector } from '@nestjs/core';
import { RoleEnum } from "./role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req:Request = context.switchToHttp().getRequest();
    let flag = false ;
    let user:IUser ;
    const roles = this.reflector.get<RoleEnum[]>('roles', context.getHandler()) ?? [];
    try {
      user = JSON.parse(<string>req.headers['user']) ;
      const find = roles.find(dd => user.roles.includes(dd)) ;
      console.log(user,roles,find,'lll')
      if(find) {
        flag = true ;
      }
    }catch (e) {
    }

    return flag;
  }
}