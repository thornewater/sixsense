import { HttpException, HttpStatus } from '@nestjs/common';

export class Forbidden extends HttpException {
  constructor(message: ForbiddenMessage) {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export enum ForbiddenMessage {
  NOT_ENOUGH_POINT = '유저의 포인트가 충분하지않습니다.',
  NOT_ENOUGH_CART = '카트에 담긴 상품의 개수가 충분하지 않습니다.',
}
