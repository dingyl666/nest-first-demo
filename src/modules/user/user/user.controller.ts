import { Body, Controller, Get,Post, Query } from "@nestjs/common";

import { DataModel, UserService } from "./user.service" ;

@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService) {}

  @Get('/getList')
  getUserList(){
    return this.userService.getUserList()
  }

  @Get()
  getUserById(@Query('userId') userId:number) {
    return this.userService.getUserById(Number(userId))
  }

  @Post('/add')
  addUser(@Body() body:DataModel) {
    return this.userService.addUser(body) ;
  }

  @Post('/del')
  delUser(@Body('userId') userId:number) {
    return this.userService.delUser(Number(userId)) ;
  }

  @Post('/up')
  upUser(@Body('userId') userId:number,@Body('name')name:string) {
    return this.userService.upUser(Number(userId),name) ;
  }
}
