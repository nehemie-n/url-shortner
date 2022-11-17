import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Add validation
   */
  app.useGlobalPipes(new ValidationPipe());
  /**
   * Add interceptors for some errors
   */
  await app.listen(process.env.TZ);
}
bootstrap();
