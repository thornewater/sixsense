import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFound extends HttpException {
  constructor(message: NotFoundMessage) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export enum NotFoundMessage {
  NO_DELETE_RECORD = 'cart가 삭제되지 않았습니다.',
  NOT_FOUND_USER = '유저를 찾지못했습니다.',
  NOT_FOUND_PRODUCTID = 'productId가 올바르지않습니다.',
  NOT_FOUND_CARTID = 'cartId가 올바르지않습니다.',
}
