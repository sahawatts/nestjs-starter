import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class MyLogger extends ConsoleLogger {
  log(message: string, context: string) {
    super.log(message, context);
  }
  error(message: string, stack?: string, context?: string) {
    super.error(message, stack, context);
  }
}
