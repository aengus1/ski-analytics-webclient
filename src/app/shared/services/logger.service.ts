// https://github.com/Robinyo/angular-wijmo-flexsheet/blob/master/src/app/services/log4ts/logger.service.ts
import { Injectable } from '@angular/core';

const noop = (): any => undefined;

export abstract class Logger {
  info: any;
  warn: any;
  error: any;
}
@Injectable()
export class LoggerService implements Logger{
  info: any;
  warn: any;
  error: any;

  invokeConsoleMethod(type: string, args?: any): void {}

}
