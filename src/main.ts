import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  // app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  await app.listen(8888);

   if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap().then();
