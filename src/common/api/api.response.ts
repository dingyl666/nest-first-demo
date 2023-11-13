

import {ApiProperty} from "@nestjs/swagger";

export class ApiResponseModel <T = any> {
  @ApiProperty()
  data: T ;

  @ApiProperty({example:200})
  code:number ;

  @ApiProperty({required:false})
  timestamp: number ;

  @ApiProperty({example:'success',required:false})
  message?:string ;

  constructor(data:T,code:number,timestamp?:number,message?:string) {
    this.data = data ;
    this.code = code ;
    this.timestamp = timestamp ;
    this.message = message ;
  }
}