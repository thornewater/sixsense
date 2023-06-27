import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFound extends HttpException {
  constructor(message: NotFoundMessage) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export enum NotFoundMessage {
  NO_DELETE_RECORD = 'cart가 삭제되지 않았습니다.',
}
