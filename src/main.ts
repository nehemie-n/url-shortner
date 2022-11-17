import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseExceptionsFilter } from './mongoose.exception.filter';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Add validation
   */
  app.useGlobalPipes(new ValidationPipe());
  /**
   * Add interceptors for some errors
   */
  app.useGlobalFilters(new MongooseExceptionsFilter());

  await app.listen(process.env.PORT, () => {
    Logger.verbose('Server Running PORT='+ process.env.PORT);
  });
}
bootstrap();
