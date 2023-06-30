import { HttpException, HttpStatus } from '@nestjs/common';

export class UnAuthorized extends HttpException {
  constructor(message: UnAuthorizedMessage) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export enum UnAuthorizedMessage {
  WRONG_ACCOUNT_PASSWORD = '올바르지 않은 계정과 비밀번호입니다.',
  WRONG_TOKEN = '올바르지 않은 토큰입니다.',
}
