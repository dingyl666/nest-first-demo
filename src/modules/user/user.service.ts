import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>,

  ){}
  findAll(){
    return this.userRepository.find() ;
  }

  find(username:string) {
    return this.userRepository.findOne({where:{username}})
  }

  async create(user:User) {
    const u = this.userRepository.create(user) ;
    return this.userRepository.save(u) ;
  }

  update(id:number,user:Partial<User>){
    return this.userRepository.update(id,user)
  }

  remove(id:number){
    this.userRepository.delete(id) ;
  }
}