type LogLevel = 0 | 1 | 2 | 3;
export class LoggerService {
  /**
   * controls which log methods execute
   * 0 = error
   * 1 = info
   * 2 = debug
   * 3 = trace
   */
  private _logLevel: LogLevel = 3;
  private static instance: LoggerService;

  public static getInstance(): LoggerService {
    if (!this.instance) {
      return new LoggerService();
    }
    return this.instance;
  }

  private constructor() {
    // intentionally left blank
  }

  get logLevel(): LogLevel {
    return this._logLevel;
  }

  set logLevel(value: LogLevel) {
    this._logLevel = value;
  }

  public error(className: string, functionName: string, message: string) {
    console.log('--------------------------------------------------');
    console.error(`>> ERROR: ${className} -- ${functionName} | ${message}`);
    console.log('--------------------------------------------------');
  }

  public info(className: string, functionName: string, message: string) {
    if (this._logLevel < 1) return;
    console.log(`>> INFO: ${className} -- ${functionName} | ${message}`);
  }

  public debug(className: string, functionName: string, message: string) {
    if (this._logLevel < 2) return;
    console.log(`>> DEBUG: ${className} -- ${functionName} | ${message}`);
  }

  public trace(className: string, functionName: string, message: string) {
    if (this._logLevel >= 3) return;
    console.log(`>> TRACE: ${className} -- ${functionName} | ${message}`);
  }
}
