import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { Profile } from './profile.extity';
import { Logs } from "src/logs/logs.extity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository:Repository<Logs>,

  ){}
  findAll(){
    return this.userRepository.find() ;
  }

  find(username:string) {
    return this.userRepository.findOne({where:{username}})
  }

  findOne(id:number) {
    return this.userRepository.findOne({where:{id}})
  }

  async create(user:User) {
    const u = this.userRepository.create(user) ;
    return this.userRepository.save(u) ;
  }

  async update(id:number,user:Partial<User>){
    return this.userRepository.update(id,user)
  }

  remove(id:number){
    this.userRepository.delete(id) ;
  }

  findProfile(id:number) {
    return this.userRepository.findOne({
      where:{
        id,
      },
      relations:{
        profile:true,
      }
    })
  }


  async findUserLogs(id:number){
    const users = await this.findOne(id) ;
    return this.logsRepository.find({
      where:{
        users
      },
      // relations:{
      //   users:true
      // }
    })
  }

  async findLogsBuGroup(id:number) {
    // return this.logsRepository.query(`
    // SELECT logs.result as rest, COUNT(logs.result) as count from logs,
    // user WHERE user.id=logs.userId = 2 GROUP BY logs.result
    // `) //或者直接写sql语句
    return this.logsRepository.createQueryBuilder('logs')
            .select('logs.result','result')
            .addSelect('COUNT("logs.result")','count')
            .leftJoinAndSelect('logs.users','user')
            .where('user.id = :id',{id})
            .groupBy('logs.result')
            // .orderBy('result','DESC') //倒叙排列
            .orderBy('count','DESC') //倒叙排列
            .addOrderBy('result','DESC') //双重倒叙排列 count优先
            .offset(2)
            .limit(3) //只查3条
            .getRawMany() ;
  }
}
