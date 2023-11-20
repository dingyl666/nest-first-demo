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

import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id:number ;

    @Column()
    gender:number ;

    @Column()
    photo:string ;

    @Column()
    address:string ;

    @OneToOne(() => User)
    // @JoinColumn({name:'user_id'}) 自定义key
    @JoinColumn() //设置了JoinColumn之后，在从profile表查user的时候 ts代码对应的字段是user
    user:User ;

}