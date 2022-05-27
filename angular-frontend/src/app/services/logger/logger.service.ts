import { Injectable } from '@angular/core';

type LogLevel = 0 | 1 | 2 | 3;
// @Injectable({
//   providedIn: 'root'
// })
export class LoggerService {
  /**
   * controls which log methods execute
   * 0 = error
   * 1 = info
   * 2 = debug
   * 3 = trace
   */
  private _logLevel: LogLevel = 3;

  constructor() { }

  get logLevel(): 0 | 1 | 2 | 3 {
    return this._logLevel;
  }

  set logLevel(value: 0 | 1 | 2 | 3) {
    this._logLevel = value;
  }

  public error(className: string, functionName: string, message: string, error: any) {
    console.log('--------------------------------------------------');
    console.error(`>> ERROR: ${className} | ${functionName}() | ${message}`);
    console.log(`>>> ERROR: ${error.message} | `, error);
    console.log('--------------------------------------------------');
  }

  public info(className: string, functionName: string, message: string) {
    if (this._logLevel < 1) return;
    console.log(`>> INFO: ${className} | ${functionName}() | ${message}`);
  }

  public debug(className: string, functionName: string, message: string, data?: any) {
    if (this._logLevel < 2) return;
    console.log(`>> DEBUG: ${className} | ${functionName}() | ${message}`, data || '');
  }

  public trace(className: string, functionName: string, message: string) {
    if (this._logLevel < 3) return;
    console.log(`>> TRACE: ${className} | ${functionName}() | ${message}`);
  }




}
