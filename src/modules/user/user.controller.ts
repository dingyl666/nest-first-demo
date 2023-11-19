import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from "@nestjs/common";

import {UserService } from './user.service';
import { ConfigService } from "@nestjs/config";
import { ConfigEnum } from "src/enum/config";
import { User } from "./user.entity";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
    ) {
    //private readonly userService: UserService是个语法糖
    //等价于 this.userService = new UserService()
     const db = this.configService.get(ConfigEnum.DB) ;
     console.log(db,'ddd') ;
  }

  @Get('/list')
  getUsers() {
    return this.userService.findAll() ;
  }

  @Post('/add') 
  addUser() {
    const user = {username:'dyl',password:'123456'} as User ;

    return this.userService.create(user) ;
  }
}
