import { RoleEnum } from "../../../common/roles/role.enum";
import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus } from "@nestjs/common";

export class DataModel {
  userId = 0;
  name = '';
  constructor(id = 0, name = '') {
    this.userId = id;
    this.name = name;
  }
}

export interface IUser {
  id:number,
  name:string,
  password:string,
  roles:RoleEnum[]
}

export const User_Map_list:IUser[] = [
  { id:1, name:RoleEnum.Master, password:RoleEnum.Master, roles:[RoleEnum.Master], },
  { id:2, name:RoleEnum.Admin, password:RoleEnum.Admin, roles:[RoleEnum.Admin], },
]

export class CreateUserDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly age: number;
}

export class IResponseCodeDto {
  @ApiProperty({ description: 'HTTP状态码' })
  code: HttpStatus;
}
export class IResponseResultListDto extends IResponseCodeDto {
  @ApiProperty({ isArray: true, type: CreateUserDto })
  items: any;
  @ApiProperty()
  list:number[]
}
