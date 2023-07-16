import { Controller, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import core from '@nestia/core';
import {
  ProductFilterDto,
  checkProductFilterDto,
} from './dto/product.list.dto';
import { success } from 'src/common/model/api.response';
import { Product, Products } from './dto/response.type';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * 상품리스트페이지 API
   *
   * API는 상품 리스트 페이지를 반환하고, 사용자가 요청하는 필터링 옵션을 제공
   *
   * 필터링 옵션:
   * 1. 'categoryId': 특정 카테고리에 속하는 상품만 반환합니다.
   * 2. '가격순 정렬': 상품을 가격에 따라 오름차순 또는 내림차순으로 정렬합니다.
   *
   * limit,offset은 반드시 보내줘야한다.
   *
   * @summary 상품리스트페이지 API
   *
   * @tag products
   *
   * @param ProductFilterDto  상품의 필터링 및 limit,offset
   *
   * @param limit  한번에 가져올 상품의 갯수
   *
   * @param offset  가져올 상품의 offset
   *
   * @returns code 200 - message가 'success'인 경우에만 API 호출이 성공함을 의미.
   *
   * @throw  500, sql error 발생시 실패
   *
   */
  @core.TypedRoute.Get()
  async findProductList(@core.TypedQuery() productFilter: ProductFilterDto) {
    checkProductFilterDto(productFilter);

    const DEFAULT_LIMIT = 10;
    const DEFAULT_OFFSET = 0;

    productFilter.limit = productFilter.limit || DEFAULT_LIMIT;
    productFilter.offset = productFilter.offset || DEFAULT_OFFSET;

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
   * @returns code 200 - response에 조회된 상품 데이터가 포함됨, response에 빈배열이 가는경우 상품 데이터가 없음
   *
   * @throw  400 - productId가 DB에 없는경우 에러발생
   *
   * @throw  500 - sql error 발생시 실패
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
