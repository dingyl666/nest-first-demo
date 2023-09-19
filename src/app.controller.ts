import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Cron } from "@nestjs/schedule";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Cron('45 * * * * *')
  handleCron() {
    console.log('Called when the current second is 45');
  }
}
