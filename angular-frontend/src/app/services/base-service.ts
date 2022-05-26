import { LoggerService } from "./logger/logger.service";

export class BaseService {
  logger: LoggerService;
  constructor() {
    this.logger = new LoggerService();
  }
}
