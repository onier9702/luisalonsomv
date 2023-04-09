import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response } from 'express';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
  })

  app.setGlobalPrefix('/api');

  await app.listen(process.env.PORT, () => {
    console.log('App running on port: ',process.env.PORT );
  });
}
bootstrap();
