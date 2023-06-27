import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logger/logger.module';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/kernel/entity/products.entity';
import { ProductImages } from 'src/kernel/entity/productImage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, ProductImages]), LoggerModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
