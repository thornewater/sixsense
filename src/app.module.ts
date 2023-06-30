import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DataSourceModule } from './data-source/data-source.module';
import { LoggerModule } from './Common/logger/logger.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { LoggingMiddleware } from './Common/logger/logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    DataSourceModule,
    LoggerModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    CartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
