import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { Profile } from './profile.extity';
import { Logs } from "src/logs/logs.extity";
import { IGetUserListQuery } from "./dto/get-user.dto";
import { conditionUtils } from "src/utils/db.helper";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
  ) {}
  findAll(query: IGetUserListQuery) {



    const {limit,page,username,role,gender} = query ;

    const take = limit ?? 10 ;

    const skip = ((page  ?? 1) - 1) * limit;


    const obj = {
      'user.username':username,
      'profile.gender' :gender,
      'roles.id':role,
    }
    const queryBuilder = this.userRepository
          .createQueryBuilder('user')
          .leftJoinAndSelect('user.profile', 'profile')
          .leftJoinAndSelect('user.roles', 'roles') ;

      const newQueryBuilder = conditionUtils(queryBuilder,obj) ;
      return newQueryBuilder.getMany() ;
        // .where(username ? 'user.username =: username' : '1=1', { username })
        // .andWhere(gender ? 'profile.gender =:gender' : '1=1', { gender })
        // .andWhere(role ? 'roles.id :=role' : '1=1', { role });
        // return queryBuilder.getMany();
    return this.userRepository.find({
      select: {
        //select 控制查询后的数据 需要展示的字段
        id: true,
        username: true,
        profile: {
          gender:true,
        },
      },
      relations: {
        profile: true,
        roles: true,
      },
      where: {
        username,
        profile: {
          gender,
        },
        roles: {
          id: role,
        },
      },
      take,
      skip,
    });
  }

  find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: User) {
    const u = this.userRepository.create(user);
    return this.userRepository.insert(u);
  }

  async update(id: number, user: Partial<User>) {
    //下面的人update方法只适合单模型更新 不适合有关系的模型更新
    // return this.userRepository.update(id, user);
    // 联合模型更新需要使用save或者querybuilder方法
    const userTemp = await this.findProfile(id) ;
    const newUser = this.userRepository.merge(userTemp,user) ;
    return this.userRepository.save(newUser) ;
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    await this.userRepository.remove(user);
  }

  findProfile(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    });
  }

  async findUserLogs(id: number) {
    const users = await this.findOne(id);
    return this.logsRepository.find({
      where: {
        users:users.logs,
      },
      // relations:{
      //   users:true
      // }
    });
  }

  async findLogsBuGroup(id: number) {
    // return this.logsRepository.query(`
    // SELECT logs.result as rest, COUNT(logs.result) as count from logs,
    // user WHERE user.id=logs.userId = 2 GROUP BY logs.result
    // `) //或者直接写sql语句
    return (
      this.logsRepository
        .createQueryBuilder('logs')
        .select('logs.result', 'result')
        .addSelect('COUNT("logs.result")', 'count')
        .leftJoinAndSelect('logs.users', 'user')
        .where('user.id = :id', { id })
        .groupBy('logs.result')
        // .orderBy('result','DESC') //倒叙排列
        .orderBy('count', 'DESC') //倒叙排列
        .addOrderBy('result', 'DESC') //双重倒叙排列 count优先
        .offset(2)
        .limit(3) //只查3条
        .getRawMany()
    );
  }
}
