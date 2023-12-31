import { Injectable } from "@nestjs/common";
import { DataModel,User_Map_list } from "./user.utils";

let list = [new DataModel(0, '测试数据')] as DataModel[];


@Injectable()
export class UserService {
  setCookie() {
    return { info: 'success' } ;
  }

  getUserById(userId: number) {
    return list.find((dd) => dd.userId === userId) ?? new DataModel();
  }

  getUserList() {
    return list;
  }

  addUser(data: DataModel) {

    if (data.userId) {
      list.push(data);
    }
    return { info: 'success' };
  }

  delUser(id: number) {
    if (id && id > 0) {
      list = list.filter((ff) => ff.userId !== id);
    }
    return { info: 'success' };
  }

  upUser(id: number, name: string) {
    const find = list.find((dd) => dd.userId === id);
    if (find) {
      find.name = name;
    }
    return { info: 'success' };
  }

  login(name:string,password:string) {
    return {
      userInfo:User_Map_list.find(dd => dd.name === name && dd.password === password)
    }
  }
}
