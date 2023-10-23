import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Res, SetMetadata
} from "@nestjs/common";

import { UserService } from './user.service';
import {Response} from 'express'
import { Cookies } from "../../../common/cookie/cookie.decorator";
import { DataModel } from "./user.utils";

@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService) {
    //private readonly userService: UserService是个语法糖
    //等价于 this.userService = new UserService()
  }

  @Get('/setCookie')
  setCookie(
    @Res({ passthrough: true }) response:Response,
    @Cookies('myNameCookie') myNameCookie:string
  ) {
    response.cookie('myNameCookie', 'dyl',{
      maxAge:1000 * 60,
    })

    return this.userService.setCookie()
  }

  @Post('/test2')
  test2() {
    return '222';
  }

  @Get('/getList')
  getUserList() {
    return this.userService.getUserList();
  }

  @Get()
  getUserById(@Query('userId') userId: number) {
    return this.userService.getUserById(Number(userId));
  }

  @Post('/add')
  addUser(@Body() body: DataModel,@Cookies('name') name: string) {
    return this.userService.addUser(body);
  }

  @Post('/del')
  delUser(@Body('userId') userId: number,) {
    if(typeof userId !== 'number' || !Number.isInteger(userId)) {
      throw new HttpException('用户编号错误', HttpStatus.BAD_REQUEST)
    }
    return this.userService.delUser(Number(userId));
  }

  @Post('/up')
  upUser(@Body('userId') userId: number, @Body('name') name: string) {
    return this.userService.upUser(Number(userId), name);
  }

  @SetMetadata('roles', ['master'])
  @Post('/login')
  login(@Body('name') name :string , @Body('password') password : string) {
    return this.userService.login(name,password)
  }
}
