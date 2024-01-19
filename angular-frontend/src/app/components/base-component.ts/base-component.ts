import { LoggerService } from "src/app/services/logger/logger.service";

export class BaseComponent {
  logger: LoggerService;
  constructor() {
    this.logger = new LoggerService();
  }

}
