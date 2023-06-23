import { HttpStatus } from '@nestjs/common';

export class StatusResponse {
  constructor(
    public readonly status: HttpStatus,
    public readonly data: ResultStatus,
  ) {}
}

export enum ResultStatus {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}
