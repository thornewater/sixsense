import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/Common/entity/products.entity';
import { ProductImages } from 'src/Common/entity/productImage.entity';
import { LoggerModule } from 'src/Common/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Products, ProductImages]), LoggerModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsRepository],
})
export class ProductsModule {}
