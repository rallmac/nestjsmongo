import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('nestjs_mongo')
    .setDescription('API for a test with mongodb')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  
  // the production server can do without the following two
  // await app.listen(process.env.PORT ?? 3000);
  // await app.listen(process.env.PORT || 3000);
  await app.listen(port, '0.0.0.0');
}
bootstrap();