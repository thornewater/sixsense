import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { CartsRepository } from './carts.repository';
import { Carts } from 'src/common/entity/carts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { LoggerModule } from 'src/common/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Carts]), LoggerModule, ProductsModule],
  controllers: [CartsController],
  providers: [CartsService, CartsRepository],
  exports: [CartsRepository],
})
export class CartsModule {}
