import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { LoggerMiddleware } from "./common/logger/logger.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.use(new LoggerMiddleware().use)
  await app.listen(8888);
   if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap().then();
