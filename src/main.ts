import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import * as helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { PORT, winstonConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.use(helmet);
  await app.listen(PORT);
}
bootstrap();
