import { Controller, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { CartsService } from './carts.service';
import core from '@nestia/core';
import {
  CartDeleteDto,
  NewCartDto,
  UpdatedCartDto,
  validateNewCartDto,
} from './dto/cart.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/common/model/api.request';
import {
  StatusResponse,
  ResultStatus,
  success,
} from 'src/common/model/api.response';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  /**
   * 장바구니 생성 API
   *
   * 회원이 상품 페이지에서 장바구니 추가 버튼을 클릭하면, 해당 상품이 사용자의 장바구니에 추가됩니다.
   * 기존의 장바구니에 해당 productId가 존재하는 클라이언트가 요청한 quantity로 변경
   *
   * @summary 장바구니 생성 API
   *
   * @tag carts
   *
   * @param createCartDto  장바구니생성시 필요한 데이터
   *
   * @returns code 201 - message가 'success'인 경우에만 API 호출이 성공함을 의미
   *
   * @throw  400 - 클라이언트에서 제공한 productId가 데이터베이스에 존재하지 않을 경우
   *
   * @throw  500 - SQL 에러가 발생한 경우
   *
   */
  @UseGuards(AuthGuard('jwt'))
  @core.TypedRoute.Post()
  async create(
    @core.TypedBody() createCartDto: NewCartDto,
    @Req() req: RequestWithUser,
  ) {
    validateNewCartDto(createCartDto);

    const userId = req.user.id;

    await this.cartsService.create(createCartDto, userId);

    return new StatusResponse(HttpStatus.CREATED, ResultStatus.SUCCESS);
  }

  /**
   * 회원의 장바구니내에 리스트를 확인하는 API
   *
   * 이 API는 회원의 장바구니에 담긴 상품들의 목록을 조회하는 기능을 제공합니다.
   * 쿠키 내에 저장된 토큰을 통해 사용자를 식별하며, 이 토큰이 없으면 API 호출이 불가능합니다.
   *
   * @summary 회원의 장바구니내에 리스트를 확인하는 API
   *
   * @tag carts
   *
   * @param cookies  쿠키에 저장된 토큰. 이 토큰이 없으면 API 호출이 불가능
   *
   * @returns code 200 - response에 조회된 상품 데이터가 포함됨, response에 빈배열이 가는경우 상품 데이터가 없음
   *
   * @throw 500 -, SQL 에러가 발생한 경우
   *
   */
  @UseGuards(AuthGuard('jwt'))
  @core.TypedRoute.Get()
  async findAllByUserId(@Req() req: RequestWithUser) {
    const userId = req.user.id;

    const result = await this.cartsService.findAllByUserId(userId);

    return success(HttpStatus.OK, result);
  }

  /**
   * 회원의 장바구니 내 특정 상품을 삭제하는 API
   *
   * 이 API는 회원의 장바구니에 담긴 특정 상품을 삭제하는 기능을 제공합니다.
   * 쿠키 내에 저장된 토큰을 통해 사용자를 식별하며, 이 토큰이 없으면 API 호출이 불가능합니다.
   *
   * @summary 회원의 장바구니 내 특정 상품을 삭제하는 API
   *
   * @tag carts
   *
   * @param cartId  삭제하고자 하는 상품의 ID
   *
   * @param cookies  쿠키에 저장된 토큰. 이 토큰이 없으면 API 호출이 불가능
   *
   * @returns code 200 - 상품이 성공적으로 삭제되는경우, response에 조회된 상품 데이터가 포함됨
   *
   * @throws statusCode 404 - cartId,userId이슈로 인하여 장바구니 데이터가 삭제 되지 않는 경우
   *
   * @throws statusCode 500 - SQL 에러가 발생한 경우
   *
   */
  @UseGuards(AuthGuard('jwt'))
  @core.TypedRoute.Delete()
  async remove(
    @core.TypedQuery() cartId: CartDeleteDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;

    const result = await this.cartsService.deleteByCartId(cartId, userId);

    return success(HttpStatus.OK, result);
  }

  /**
   * 회원의 장바구니 내 특정 상품의 수량을 변경하는 API
   *
   * 이 API는 장바구니에 담긴 특정 상품의 수량을 업데이트하는 기능을 제공합니다.
   * 쿠키에 저장된 토큰을 통해 사용자를 식별하며, 이 토큰이 없으면 API 호출이 불가능합니다.
   *
   * @summary 회원의 장바구니 내 특정 상품의 수량을 변경하는 API
   *
   * @tag carts
   *
   * @param UpdateCartReq  업데이트하고자 하는 상품의 수량 정보와 cartId
   *
   * @param cookies  쿠키에 저장된 토큰. 이 토큰이 없으면 API 호출이 불가능
   *
   * @returns code 200 - 상품이 성공적으로 수량이 변경 되는 경우, response에 조회된 상품 데이터가 포함됨
   *
   * @throw statusCode 500 - SQL 에러가 발생한 경우
   *
   */
  @UseGuards(AuthGuard('jwt'))
  @core.TypedRoute.Patch()
  async updateCartQuantity(
    @core.TypedBody() UpdateCartReq: UpdatedCartDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;

    const result = await this.cartsService.updateCartQuantity(
      UpdateCartReq,
      userId,
    );

    return success(HttpStatus.OK, result);
  }
}
