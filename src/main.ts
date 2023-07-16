import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as xss from 'xss-clean';
import { winstonConfig } from './common/logger/winston.config';
import { WinstonModule } from 'nest-winston';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  const origin = process.env.ORIGIN_SITE || 'http://localhost:3000';

  app.enableCors({
    origin: [origin],
    credentials: true,
    methods: 'POST,GET,PUT,PATCH,DELETE,OPTIONS',
  });

  app.set('trust proxy', true);

  app.use(xss());

  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

  app.use(
    helmet.hsts({
      maxAge: 60 * 60 * 24 * 365,
      includeSubDomains: true,
      preload: true,
    }),
  );

  await app.listen(process.env.MAIN_PORT || 3001);
}
bootstrap();
