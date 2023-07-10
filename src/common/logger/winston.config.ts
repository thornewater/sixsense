import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const env = process.env.NODE_ENV;

const dailyOptions = (level: string) => {
  return {
    level: env === 'production' ? 'http' : 'silly',
    filename: `application-%DATE%-${level}.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    dirname: 'logs',
  };
};

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        env === 'production'
          ? winston.format.simple()
          : winston.format.prettyPrint(),
        nestWinstonModuleUtilities.format.nestLike('Sixsense', {
          prettyPrint: true,
        }),
      ),
    }),
    new DailyRotateFile(dailyOptions('info')),
    new DailyRotateFile(dailyOptions('error')),
    new DailyRotateFile(dailyOptions('warn')),
  ],
};
