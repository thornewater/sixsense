import { HttpStatus } from '@nestjs/common';

export class StatusResponse {
  constructor(
    public readonly status: HttpStatus,
    public readonly data: ResultStatus,
  ) {}
}

export interface Response<T extends object> {
  /**
   * statusCode
   *
   */
  code: number;

  /**
   * 성공 또는 오류 메시지.
   */
  message: string;

  /**
   * 응답 데이터, 사실상 본문.
   */
  response: T;
}

export function success<T extends object>(
  httpStatus: HttpStatus,
  response: T,
): Response<T> {
  return {
    code: httpStatus,
    message: 'success',
    response,
  };
}

export enum ResultStatus {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}
