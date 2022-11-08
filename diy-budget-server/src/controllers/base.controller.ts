import { LoggerService } from '../services/logger.service';
import { Response } from 'express-serve-static-core';


export default abstract class BaseController {
  protected logger: LoggerService;
  constructor() {
    this.logger = LoggerService.getInstance();
  }

  public abstract handleResponse(res: Response, data: any): void;
  public abstract handleError(res: Response, err: Error): void;
}
