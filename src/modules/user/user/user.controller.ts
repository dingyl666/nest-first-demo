import { Body, Controller, createParamDecorator, Get, HttpException, HttpStatus, Post, Query } from "@nestjs/common";

import { DataModel, UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    //private readonly userService: UserService是个语法糖
    //等价于 this.userService = new UserService()
  }

  @Get('/test')
  test() {
    return '111';
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
  addUser(@Body() body: DataModel) {
    return this.userService.addUser(body);
  }

  @Post('/del')
  delUser(@Body('userId') userId: number) {
    if(typeof userId !== 'number' || !Number.isInteger(userId)) {
      throw new HttpException('用户编号错误', HttpStatus.BAD_REQUEST)
    }
    return this.userService.delUser(Number(userId));
  }

  @Post('/up')
  upUser(@Body('userId') userId: number, @Body('name') name: string) {
    return this.userService.upUser(Number(userId), name);
  }
}
