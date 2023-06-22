import { Injectable, Inject, Scope } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  log(message: string, context = '') {
    this.logger.info(message, { context });
  }

  error(message: string, trace = '', context = '') {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context = '') {
    this.logger.warn(message, { context });
  }

  debug(message: string, context = '') {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context = '') {
    this.logger.verbose(message, { context });
  }
}
