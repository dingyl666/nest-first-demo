import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module:any ;
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  // app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(8888);

   if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap().then();
