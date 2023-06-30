import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/common/entity/products.entity';
import { ProductImages } from 'src/common/entity/productImage.entity';
import { LoggerModule } from 'src/common/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Products, ProductImages]), LoggerModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsRepository],
})
export class ProductsModule {}
