import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user/user.module';
import { ScheduleModule } from "@nestjs/schedule";
import { RolesGuard } from "./common/roles/roles.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [UserModule,ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
