

import {ApiProperty} from "@nestjs/swagger";

export class ApiResponse <T = any> {
  @ApiProperty()
  data: T ;

  @ApiProperty({example:200})
  code:number ;

  @ApiProperty()
  timestamp: number ;

  @ApiProperty({example:'success'})
  message?:string ;

  constructor(data:T,code:number,timestamp:number,message?:string) {
    this.data = data ;
    this.code = code ;
    this.timestamp = timestamp ;
    this.message = message ;
  }
}