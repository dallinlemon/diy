import { LoggerService } from "./logger.service";

export abstract class BaseService {
  protected logger: LoggerService;

  protected constructor() {
    this.logger = LoggerService.getInstance();
  }
}
