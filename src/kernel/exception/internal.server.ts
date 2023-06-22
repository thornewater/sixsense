import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerError extends HttpException {
  constructor(message: InternalServerMessage) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export enum InternalServerMessage {
  DATABASE_ERROR = 'SQL ERROR',
}
