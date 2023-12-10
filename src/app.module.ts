import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ScheduleModule } from "@nestjs/schedule";
import {ConfigModule} from "@nestjs/config" ;
import Configuration from "./configuration"
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from './modules/user/user.entity';
import { Profile } from './modules/user/profile.extity';
import { Logs } from './logs/logs.extity';
import { Roles } from './roles/roles.entity';
import { LoggerModule } from 'nestjs-pino' ;
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    UserModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal:true,
      // load:[Configuration],
    }),
     LoggerModule.forRoot({
      pinoHttp:{
        transport:process.env.NODE_ENV === 'development'
        ?{
          target:'pino-pretty',
          options:{
            colorize:true
          }
        }
        :{
          target:'pino-roll',
          options:{
            file:join('logs','log.txt'),
            frequency:'daily',
            size:'10m',//'0.1k'
            mkdir:true,
          }
        }
      }
     }),
     TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "password",
      database: "nest",
      entities: [User,Profile,Logs,Roles],
      synchronize: true,
      logging:process.env.NODE_ENV === 'development',
    }),
     AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
