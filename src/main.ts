import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  // -----------------------------swagger 配置-----------------------------
  const config = new DocumentBuilder()
    .setTitle('博客系统API')
    .setDescription('我的第一个 Nest 项目')
    .setVersion('1.0')
    .addTag('Blog')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  // swagger 访问地址：http://localhost:3000/api-docs
  // -----------------------------swagger 配置------------------------------

  await app.listen(3000);
}
bootstrap();
