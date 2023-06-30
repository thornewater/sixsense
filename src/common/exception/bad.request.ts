import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequest extends HttpException {
  constructor(message: BadRequestMessage) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export enum BadRequestMessage {
  DUPLICATE_ACCOUNT = '중복된 ID입니다.',
  PRODUCT_ID_NOT_FOUND = '해당 상품을 찾을 수 없습니다.',
}
