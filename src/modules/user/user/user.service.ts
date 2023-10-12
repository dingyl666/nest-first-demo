import { Injectable } from "@nestjs/common";

export class DataModel {
  userId = 0;
  name = '';

  constructor(id = 0, name = '') {
    this.userId = id;
    this.name = name;
  }
}
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
}
