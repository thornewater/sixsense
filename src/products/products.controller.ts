import { Controller, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import core from '@nestia/core';
import { ProductFilterDto } from './dto/product.list.dto';
import { success } from 'src/kernel/model/api.response';
import { Product, Products } from './dto/response.type';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * 상품리스트페이지 API
   *
   * 상품의 리스트페이지보내주며, 필터링을 가능하게해준다.
   *
   * 필터링의 종류:
   * categoryId, 가격순정렬 2가지 가능
   *
   * limit,offset은 반드시 보내줘야한다.
   *
   * @summary 상품리스트페이지 API
   *
   * @tag products
   *
   * @param ProductFilterDto  상품의 필터링 및 limit,offset
   * @param limit  한번에 가져올 상품의 갯수
   * @param offset  가져올 상품의 offset
   *
   * @returns statusCode 200일때 data를 보내준다.
   *
   * @throw 500, sql error 발생시 실패
   *
   */
  @core.TypedRoute.Get()
  async findProductList(@core.TypedQuery() productFilter: ProductFilterDto) {
    const result: Products = await this.productsService.findProductList(
      productFilter,
    );

    return success(HttpStatus.OK, result);
  }

  /**
   * 상품디테일페이지 API
   *
   * 상품의 디테일페이지에 대한 데이터를 보내주는 API
   *
   * @summary 상품디테일페이지 API
   *
   * @tag products
   *
   * @param productId  productId를 반드시 보내줘야한다.
   *
   * @returns statusCode 200일때 data를 보내준다.
   *
   * @throw 400, productId가 DB에 없는경우 에러발생
   *
   * @throw 500, sql error 발생시 실패
   *
   */
  @core.TypedRoute.Get(':productId')
  async findProductOne(
    @core.TypedParam('productId', 'number') productId: number,
  ) {
    const result: Product = await this.productsService.findOne(productId);

    return success(HttpStatus.OK, result);
  }
}
