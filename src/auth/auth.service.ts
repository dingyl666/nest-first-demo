import { Injectable } from '@nestjs/common';
import { IGetUserListQuery } from 'src/modules/user/dto/get-user.dto';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signin(username: string, password: string) {
    const res = await this.userService.findAll({
      username,
    } as IGetUserListQuery);

    return res
  }

  signup(username: string, password: string) {}
}
