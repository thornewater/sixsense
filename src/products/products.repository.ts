import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductFilterDto } from './dto/product.list.dto';
import { Products } from 'src/kernel/entity/products.entity';
import { ProductImages } from 'src/kernel/entity/productImage.entity';

import { productRaw } from './dto/response.type';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(ProductImages)
    private readonly productImagesRepository: Repository<ProductImages>,
  ) {}

  async findProductList(productFilter: ProductFilterDto) {
    const products = await this.fetchProducts(productFilter);
    const productIds = this.getProductIds(products);
    const imagesGroupedByProductId = await this.fetchGroupedProductImages(
      productIds,
    );

    this.assignProductImages(products, imagesGroupedByProductId);

    return products;
  }

  private async fetchProducts(productFilter: ProductFilterDto) {
    const sortDirection = productFilter.sort === 'priceInDESC' ? 'DESC' : 'ASC';

    const query = this.productsRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.category', 'category')
      .leftJoinAndSelect('products.incense', 'incense')
      .orderBy(`products.price * (1 - products.discountRate)`, sortDirection)
      .limit(productFilter.limit)
      .offset(productFilter.offset);

    if (productFilter.categoryId) {
      query.andWhere('products.category = :categoryId', {
        categoryId: productFilter.categoryId,
      });
    }

    return query.getMany();
  }

  private getProductIds(products) {
    return products.map((product) => product.id);
  }

  private async fetchGroupedProductImages(productIds) {
    const productImages = await this.productImagesRepository
      .createQueryBuilder('productImage')
      .select('productImage.imageUrl', 'imageUrl')
      .addSelect('productImage.product_id', 'productId')
      .where('productImage.product_id IN (:...productIds)', { productIds })
      .getRawMany();

    return productImages.reduce((groups, image) => {
      const key = image.productId;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(image.imageUrl);
      return groups;
    }, {});
  }

  private assignProductImages(products, imagesGroupedByProduct) {
    products.forEach((product) => {
      product.productImages = imagesGroupedByProduct[product.id];
    });
  }

  async findByProductIdWithImage(productId: number): Promise<productRaw> {
    const product = await this.productsRepository
      .createQueryBuilder('products')
      .select([
        'products.id AS productId',
        'products.name  AS productName',
        'products.price  AS productPrice',
        'products.description  AS productDescription',
        'products.stock AS productStock',
        'products.detailImage AS productDetailImage',
        'JSON_ARRAYAGG(product_images.image_url) AS productImages',
        'products.discount_rate AS discountRate',
        'CASE WHEN products.discount_rate > 0 THEN products.price * (1 - products.discount_rate) ELSE products.price END AS discountedPrice',
      ])
      .innerJoin('products.productImages', 'product_images')
      .where('products.id = :productId', { productId })
      .groupBy('products.id')
      .getRawOne();

    return product;
  }

  async findOneByProductId(productId: number) {
    return await this.productsRepository.findOne({
      where: { id: productId },
    });
  }
}
