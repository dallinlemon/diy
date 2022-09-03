export default class ArchiveDBFileException extends Error {
  constructor(message: string) {
    super(`${ArchiveDBFileException.name} | ${message}`);
    this.name = 'ArchiveDBFileException';
    Object.setPrototypeOf(this, ArchiveDBFileException.prototype);
  }
}