import { RoleEnum } from "../../../common/roles/role.enum";

export class DataModel {
  userId = 0;
  name = '';
  constructor(id = 0, name = '') {
    this.userId = id;
    this.name = name;
  }
}
export let list = [new DataModel(0, '测试数据')] as DataModel[];

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
