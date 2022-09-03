import FileManagerService from './file-manager.service';
import { LoggerService } from './logger.service';

export default class BaseClass {
  protected logger: LoggerService = LoggerService.getInstance();
  protected static staticLogger: LoggerService = LoggerService.getInstance();
  protected fileManagerService: FileManagerService;
  constructor() { 
    this.fileManagerService = new FileManagerService();
    // intentionally left blank
  }
}
