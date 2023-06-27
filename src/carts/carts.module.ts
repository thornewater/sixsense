import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { CartsRepository } from './carts.repository';
import { Carts } from 'src/kernel/entity/carts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logger/logger.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Carts]), LoggerModule, ProductsModule],
  controllers: [CartsController],
  providers: [CartsService, CartsRepository],
})
export class CartsModule {}
