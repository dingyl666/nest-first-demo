import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus, Logger, Param, ParseIntPipe,
  Post,
  Query,
  Res
} from "@nestjs/common";

import { UserService } from './user.service';
import {Response} from 'express'
import { Cookies } from "../../../common/cookie/cookie.decorator";
import { CreateUserDto, DataModel, IResponseResultListDto } from "./user.utils";
import { Roles } from "../../../common/roles/roles.decorator";
import { RoleEnum } from "../../../common/roles/role.enum";
import { ApiBody,ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService) {
    //private readonly userService: UserService是个语法糖
    //等价于 this.userService = new UserService()
  }


  @Get('/')
  test(@Query('id',ParseIntPipe) id: number) {
    Logger.warn(id,'iii')
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

  @Get('/:id')
  getUserById(@Query('userId',ParseIntPipe) userId: number) {
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


  @Roles(RoleEnum.Master)
  @Post('/up')
  upUser(@Body('userId') userId: number, @Body('name') name: string) {
    return this.userService.upUser(Number(userId), name);
  }


  @Post('/login')
  login(@Body('name') name :string , @Body('password') password : string) {
    return this.userService.login(name,password)
  }



  @ApiTags('title 测试')
  @ApiBody({ type: CreateUserDto })
  @Post('/swagger/test/post')
  @ApiResponse({ type: IResponseResultListDto })
  swaggerTest() {
  }
}

