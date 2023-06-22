import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const dailyOptions = (level: string) => {
  return {
    level: level,
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
        winston.format.prettyPrint(),
        nestWinstonModuleUtilities.format.nestLike('Sixsense', {
          prettyPrint: true,
        }),
      ),
    }),
    new DailyRotateFile(dailyOptions('info')),
    new DailyRotateFile(dailyOptions('error')),
    new DailyRotateFile(dailyOptions('verbose')),
    new DailyRotateFile(dailyOptions('warn')),
    new DailyRotateFile(dailyOptions('debug')),
    new DailyRotateFile(dailyOptions('silly')),
  ],
};
