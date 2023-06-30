// app.service.ts
import { Injectable } from '@nestjs/common';
import { LoggerService } from './Common/logger/logger.service';

@Injectable()
export class AppService {
  constructor(private logger: LoggerService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
