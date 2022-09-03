
export enum FileManagerFlags {
  /** Open file for reading. An exception occurs if the file does not exist. */
  READ_IF_EXISTS = 'r',
  /** Open file for reading and writing. An exception occurs if the file does not exist. */
  READ_WRITE_IF_EXISTS = 'r+',
  /** Open file for reading in synchronous mode. */
  READ_SYNCHRONOUSLY = 'rs',
  /** Open file for reading and writing, telling the OS to open it synchronously. */
  READ_WRITE_SYNCHRONOUSLY = 'rs+',
  /** Open file for writing. The file is created (if it does not exist) or truncated (if it exists). */
  WRITE = 'w',
  /** Like WRITE but fails if path exists. */
  WRITE_IF_NOT_EXISTS = 'wx',
  /** Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists). */
  READ_WRITE = 'w+', 
  /** Like READ_WRITE but fails if path exists. */
  READ_WRITE_IF_NOT_EXISTS = 'wx+',
  /** Open file for appending. The file is created if it does not exist. */
  APPEND = 'a',
  /** Like APPEND but fails if path exists. */
  APPEND_IF_NOT_EXISTS = 'ax',
  /** Open file for reading and appending. The file is created if it does not exist. */
  READ_APPEND = 'a+',
  /** Like READ_APPEND but fails if path exists. */
  READ_APPEND_IF_NOT_EXISTS = 'ax+'

}

export const PathSeparator = /\\+|\/+/;

