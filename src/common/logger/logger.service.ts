import { Injectable, Inject, Scope } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import * as moment from 'moment-timezone';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  log(message: string, context = '') {
    this.logger.info(`TIME:${this.nowTime()} message:${message}`, { context });
  }

  error(message: string, trace = '', context = '') {
    this.logger.error(`TIME:${this.nowTime()} message:${message}`, {
      trace,
      context,
    });
  }

  warn(message: string, context = '') {
    this.logger.warn(`TIME:${Date.now()} message:${message}`, { context });
  }

  debug(message: string, context = '') {
    this.logger.debug(`TIME:${Date.now()} message:${message}`, { context });
  }

  verbose(message: string, context = '') {
    this.logger.verbose(`TIME:${Date.now()} message:${message}`, { context });
  }

  nowTime() {
    return moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
  }
}
