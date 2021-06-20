import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const rotateFileConfig = {
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
  maxFiles: '14d',
  dirname: 'logs',
};

let transports = [];

if (process.env.NODE_ENV !== 'production') {
  transports = [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf((info) => {
          const { timestamp, level, message, ...extra } = info;

          return `${timestamp} [${level}]: ${message} ${
            Object.keys(extra).length
              ? JSON.stringify(extra, null, 2).replace(/\\n/g, '\n\r')
              : ''
          }`;
        }),
      ),
      level: 'error',
    }),
  ];
} else {
  transports = [
    new winston.transports.DailyRotateFile({
      filename: 'error-%DATE%.log',
      level: 'error',
      ...rotateFileConfig,
    }),
    new winston.transports.DailyRotateFile({
      filename: 'combined-%DATE%.log',
      ...rotateFileConfig,
    }),
  ];
}

export const winstonConfig: WinstonModuleOptions = {
  transports,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.simple(),
  ),
};
