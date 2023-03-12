import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = app.get(ConfigService)

  const host = config.getOrThrow<string>('app.host')
  const port = config.getOrThrow<number>('app.port')
  await app.listen(port,host);
}
bootstrap();
