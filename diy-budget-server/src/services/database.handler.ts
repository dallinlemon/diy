import { databaseExtension, databaseName, databasePath } from '../constants/dao.constants';
import BaseClass from './base-class';
import FileManagerService from './file-manager.service';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

type DatabaseHandlerOption = (h: DatabaseHandler) => void;

export default class DatabaseHandler extends BaseClass {
  private static instance: DatabaseHandler;
  private db;

  public static async getInstance(): Promise<DatabaseHandler> {
    if (!DatabaseHandler.instance) {
      DatabaseHandler.instance = new DatabaseHandler(
        await DatabaseHandler.withOpenDatabase()
      );
    }
    return Promise.resolve(DatabaseHandler.instance);
  }

  protected constructor(...options: DatabaseHandlerOption[]) {
    super();
    options.forEach((option) => {
      option(this);
    });
  }

  public static async withOpenDatabase(): Promise<DatabaseHandlerOption> {
    const tempDb = await DatabaseHandler.openDatabase();
    return (h: DatabaseHandler) => {
      h.db = tempDb;
    };
  }

  protected static async openDatabase(): Promise<any> {
    try {
      console.log(`Opening database: ${databaseName}${databaseExtension}`);
      const tempDb = await open({
        filename: databasePath,
        driver: sqlite3.Database
      });
      this.staticLogger.debug(DatabaseHandler.name, this.openDatabase.name, 'Database connection established.');
      return Promise.resolve(tempDb);
    } catch (err) {
      this.staticLogger.debug(DatabaseHandler.name, this.openDatabase.name, `Error opening database: ${err.message}`);
      return Promise.resolve(null);
    }
  }

  public async closeDatabase(): Promise<boolean> {
    try {
      await this.db.close();
      this.logger.debug(DatabaseHandler.name, this.closeDatabase.name, 'DatabaseDao | Database connection terminated.');
      return Promise.resolve(true);
    } catch (err) {
      this.logger.debug(DatabaseHandler.name, this.closeDatabase.name, `Error closing database: ${err.message}`);
      return Promise.resolve(false);
    }
  }

  public run(sql: string): Promise<any> {
    return this.db.run(sql);
  }
}