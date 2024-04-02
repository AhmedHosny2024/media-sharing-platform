import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const PORT = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
    },
  ));
  // enable cors
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  await app.listen(PORT);
}
bootstrap(); 
