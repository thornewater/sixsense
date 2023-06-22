// app.service.ts
import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

@Injectable()
export class AppService {
  constructor(private logger: LoggerService) {}

  getHello(): string {
    this.logger.log('Hello World!', 'AppService');
    return 'Hello World!';
  }
}
