import { NestFactory } from "@nestjs/core";
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { LoggerMiddleware } from "./common/logger/logger.middleware";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.use(new LoggerMiddleware().use) ;

  const options = new DocumentBuilder()
    .setTitle('dyl nest test')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app,options) ;
  SwaggerModule.setup('api/v1', app, document);
  await app.listen(8888);
   if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap().then();
