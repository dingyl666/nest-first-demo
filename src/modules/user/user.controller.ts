import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';

import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/enum/config';
import { User } from './user.entity';
import { Logger } from 'nestjs-pino';
import { IGetUserListQuery } from './dto/get-user.dto';
import { TypeormFilter } from 'src/filters/typeorm.filter';

@Controller('user')
@UseFilters(new TypeormFilter())
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    //private readonly userService: UserService是个语法糖
    //等价于 this.userService = new UserService()
    const db = this.configService.get(ConfigEnum.DB);
    console.log(db, 'ddd');
  }

  @Get('/list')
  // @Get('/list/id') 路径参数 用params获取
  getUsers(@Query() query: IGetUserListQuery) {
    console.log(
      '🚀 ~ file: user.controller.ts:39 ~ UserController ~ getUsers ~ query:',
      query,
    );

    //前端传递的query 里的参数全都是string 有的需要转换类型
    return this.userService.findAll(query);
  }

  @Post('/add')
  addUser(@Body() dto: any) {
    const user = { username: 'dyl', password: '123456' } as User;
    return this.userService.create(user);
  }

  @Get('/profile')
  findProfile(@Query() query: any) {
    console.log(
      '🚀 ~ file: user.controller.ts:55 ~ UserController ~ findProfile ~ query:',
      query,
    );

    return this.userService.findProfile(1);
  }

  @Patch('/:idxx')
  updateUser(
    @Body() dto: any,
    @Param('idxx') id: number,
    @Headers('Authorization') headers: any,
  ) {
    console.log(
      '🚀 ~ file: user.controller.ts:70 ~ UserController ~ headers:',
      headers,
    );

    if (headers === id) {
      const user = dto as User;
      this.userService.update(id, user);
    } else {
      // throw new HttpException('没有权限', 403);
      throw new UnauthorizedException() ;
    }
  }

  @Delete('/:idxx')
  deleteUser(@Param('idxx') id: number) {}

  @Get('/logs')
  findUserLogs() {
    return this.userService.findUserLogs(2);
  }

  @Get('/logsBuGroup')
  async getLogsBuGroup() {
    const res = await this.userService.findLogsBuGroup(2);
    return res.map((pp) => ({
      count: Number(pp.count),
      result: pp.result,
    }));
  }
}
