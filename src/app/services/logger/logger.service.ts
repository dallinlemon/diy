import { Injectable } from '@angular/core';
// TODO: update this logger to take the class or function name and append it to the log
@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  /**
   * controls which log methods execute
   * 0 = error
   * 1 = info
   * 2 = debug
   * 3 = trace
   */
  private _logLevel: 0 | 1 | 2 | 3 = 3;

  constructor() { }

  get logLevel(): 0 | 1 | 2 | 3 {
    return this._logLevel;
  }

  set logLevel(value: 0 | 1 | 2 | 3) {
    this._logLevel = value;
  }

  public error(message: string) {
    console.log('--------------------------------------------------');
    console.error('>> ERROR: ' + message);
    console.log('--------------------------------------------------');
  }

  public info(message: string) {
    if (this._logLevel < 1) return;
    console.log('>> INFO: ' + message);
  }

  public debug(message: string) {
    if (this._logLevel < 2) return;
    console.log('>> DEBUG: ' + message);
  }

  public trace(message: string) {
    if (this._logLevel >= 3) return;
    console.log('>> TRACE: ' + message);
  }




}
