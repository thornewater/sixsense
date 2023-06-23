import { readFileSync } from 'fs';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as xss from 'xss-clean';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { winstonConfig } from './logger/winston.config';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  app.enableCors({
    methods: 'POST,GET,PUT,PATCH,DELETE,OPTIONS',
  });

  app.use(xss());

  app.use(
    helmet.hsts({
      maxAge: 60 * 60 * 24 * 365,
      includeSubDomains: true,
      preload: true,
    }),
  );

  await app.listen(process.env.MAIN_PORT || 3000);

  console.log('Application is running on PORT: ', process.env.MAIN_PORT);
}
bootstrap();
