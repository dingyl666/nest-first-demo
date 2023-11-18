import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user/user.module';
import { ScheduleModule } from "@nestjs/schedule";
import {ConfigModule} from "@nestjs/config" ;
import Configuration from "./configuration"
@Module({
  imports: [
    UserModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal:true,
      load:[Configuration]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
