import { Controller, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import core from '@nestia/core';
import { CreateOrderReqDto } from './dto/order.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/common/model/api.request';
import { ResultStatus, StatusResponse } from 'src/common/model/api.response';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * 고객의 장바구니에서 주문 API
   *
   * 고객이 장바구니에 담긴 상품을 주문하는 기능을 제공
   * 클라이언트에서 제공하는 cart정보를 바탕으로 주문
   *
   * @summary 고객의 장바구니에서 주문 API
   *
   * @tag order
   *
   * @param createOrderReqDto  주문시에 필요한 정보
   *
   * @param cookies  쿠키에 저장된 토큰. 이 토큰이 없으면 API 호출이 불가능
   *
   * @returns code 201 - message가 'success'인 경우에만 API 호출이 성공함을 의미
   *
   * @throw  400 - 사용자의 포인트(userPoint)가 부족하거나, 제공된 productId나 cartId가 존재하지 않는 경우에 발생하는 에러
   *
   * @throw  500 - SQL 에러가 발생한 경우
   *
   */
  @UseGuards(AuthGuard('jwt'))
  @core.TypedRoute.Post()
  async create(
    @core.TypedBody() createOrderReqDto: CreateOrderReqDto,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;

    await this.orderService.create(user, createOrderReqDto);

    return new StatusResponse(HttpStatus.CREATED, ResultStatus.SUCCESS);
  }
}
