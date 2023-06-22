import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as xss from 'xss-clean';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  const config = new DocumentBuilder()
    .setTitle('Sixsense 1st Project')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('swagger')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.MAIN_PORT || 3000);
  console.log('Application is running on PORT: ', process.env.MAIN_PORT);
}
bootstrap();
