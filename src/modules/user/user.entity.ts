// Copyright 2023 18112
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Logs } from "src/logs/logs.extity";
import { Roles } from "src/roles/roles.entity";
import { AfterInsert, AfterRecover, AfterRemove, Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.extity";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique:true ,//username 唯一 不能添加重名的
  })
  username: string;

  @Column()
  password: string;
  @OneToOne(() => Profile,profile => profile.user)
  profile:Profile

  @OneToMany(() => Logs,logs => logs.users)
  logs:Logs[]

  @ManyToMany(() => Roles,roles => roles.user)
  @JoinTable({name:'users_roles'})
  roles:Roles[] ;

  @AfterInsert()
  afterInsert(){
    console.log("🚀 ~ file: user.entity.ts:43 ~ User ~ afterInsert ~ afterInsert:", 'afterInsert')
    
  }

  @AfterRemove()
  afterRemove() {
    console.log("🚀 ~ file: user.entity.ts:49 ~ User ~ afterRemove ~ afterRemove:",
     this.id,this.username
     )
    
  }
}