import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductFilterDto } from './dto/product.list.dto';
import { Product } from './dto/response.type';
import {
  BadRequest,
  BadRequestMessage,
} from 'src/Common/exception/bad.request';
import { LoggerService } from 'src/Common/logger/logger.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly logger: LoggerService,
  ) {}

  async findProductList(productFilter: ProductFilterDto) {
    const products = await this.productsRepository.findProductList(
      productFilter,
    );

    const transformedProducts = products.map((product) => {
      return {
        productId: product.id,
        productName: product.name,
        productDescription: product.description,
        productPrice: Number(product.price),
        discountPrice: Number(
          product.price * (1 - Number(product.discountRate)),
        ),
        discountRate: Number(product.discountRate),
        categoryId: product.category?.id,
        categoryName: product.category?.name,
        incenseName: product.incense?.name,
        productDetailImage: product.detailImage,
        productImages: product.productImages as unknown as string[],
      };
    });

    return transformedProducts;
  }

  async findOne(productId: number): Promise<Product> {
    const product = await this.productsRepository.findByProductIdWithImage(
      productId,
    );

    if (!product) {
      this.logger.error(
        `${BadRequestMessage.PRODUCT_ID_NOT_FOUND} productId: ${productId}`,
        new Error().stack,
        'ProductsService',
      );

      throw new BadRequest(BadRequestMessage.PRODUCT_ID_NOT_FOUND);
    }

    const transformedProduct = {
      productId: product.productId,
      productName: product.productName,
      productDescription: product.productDescription,
      productStock: product.productStock,
      productDetailImage: product.productDetailImage,
      productImages: product.productImages,
      productPrice: Number(product.productPrice),
      discountRate: Number(product.discountRate),
      discountedPrice: Number(product.discountedPrice),
    };

    return transformedProduct;
  }
}
