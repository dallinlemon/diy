import { HttpClient } from '@angular/common/http';
import { LoggerService } from '../../logger/logger.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export abstract class BaseApiClient {
  logger: LoggerService;
  constructor(private http: HttpClient) {
    this.logger = new LoggerService();
  }


  public get(url: string, options: any): Promise<any> {
    this.logger.trace(BaseApiClient.name, 'sendRequest', 'was called with ...');
    this.logger.trace(BaseApiClient.name, 'sendRequest', JSON.stringify(options));
    return new Promise((resolve, reject) => {
      try {
        this.http.get(url, options).subscribe((response: any) => {
        this.logger.trace(BaseApiClient.name, 'sendRequest', 'response ...');
          this.logger.trace(BaseApiClient.name, 'sendRequest', JSON.stringify(response));
          resolve(response);
        });
      } catch (error) {
        this.logger.error(BaseApiClient.name, 'sendRequest', 'Error on request', error);
        reject(error);
      }
    });
  }
}
