import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}
  use = (req: Request, res: Response, next: NextFunction) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.ip;
    const startTime = Date.now();
    res.on('finish', () => {
      const endTime = Date.now();
      this.logger.log(
        ` IP: ${ipAddress} path: ${req.url} WorkingTime: ${
          endTime - startTime
        }ms`,
        `${req.url}`,
      );
    });
    next();
  };
}
