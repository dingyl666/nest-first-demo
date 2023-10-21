import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { IUser } from "../../modules/user/user/user.utils";
import { RoleEnum } from "./role.enum";

@Injectable()
export class RolesGuard implements CanActivate {

  constructor() {}
  canActivate(context: ExecutionContext): boolean {
    const req:Request = context.switchToHttp().getRequest();
    let flag = true

    let user:IUser ;
    try {
      user = JSON.parse(<string>req.headers['user']) ;
      console.log(user,'uuu')
    }catch (e) {
    }


    return flag;
  }
}