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

  public static async openDatabase(): Promise<any> {
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

  public async run(sql: string): Promise<any> {
    this.logger.info(DatabaseHandler.name, this.run.name, `Executing SQL: ${sql}`);
    try {
      const result = await this.db.run(sql);
      this.logger.info(DatabaseHandler.name, this.run.name, `SQL executed successfully: ${sql}`);
      this.logger.debug(DatabaseHandler.name, this.run.name, `SQL result: ${JSON.stringify(result)}`);
      return Promise.resolve(result);
    } catch (err) {
      this.logger.error(DatabaseHandler.name, this.run.name, `Error executing SQL: ${err.message}`, err);
      return Promise.reject(err);
    }
  }

  public async get(sql: string): Promise<any> {
    this.logger.info(DatabaseHandler.name, this.get.name, `Executing SQL: ${sql}`);
    try {
      const result = await this.db.get(sql);
      this.logger.info(DatabaseHandler.name, this.get.name, `SQL executed successfully: ${sql}`);
      this.logger.debug(DatabaseHandler.name, this.get.name, `SQL result: ${JSON.stringify(result)}`);
      return Promise.resolve(result);
    } catch (err) {
      this.logger.error(DatabaseHandler.name, this.get.name, `Error executing SQL: ${err.message}`, err);
      return Promise.reject(err);
    }
  }

  public async all(sql: string): Promise<any> {
    this.logger.info(DatabaseHandler.name, this.all.name, `Executing SQL: ${sql}`);
    try {
      const result = await this.db.all(sql);
      this.logger.info(DatabaseHandler.name, this.all.name, `SQL executed successfully: ${sql}`);
      this.logger.debug(DatabaseHandler.name, this.all.name, `SQL result: ${JSON.stringify(result)}`);
      return Promise.resolve(result);
    } catch (err) {
      this.logger.error(DatabaseHandler.name, this.all.name, `Error executing SQL: ${err.message}`, err);
      return Promise.reject(err);
    }
  }

  public async exec(sql: string): Promise<any> {
    this.logger.info(DatabaseHandler.name, this.exec.name, `Executing SQL: ${sql}`);
    try {
      const result = await this.db.exec(sql);
      this.logger.info(DatabaseHandler.name, this.exec.name, `SQL executed successfully: ${sql}`);
      this.logger.debug(DatabaseHandler.name, this.exec.name, `SQL result: ${JSON.stringify(result)}`);
      return Promise.resolve(result);
    } catch (err) {
      this.logger.error(DatabaseHandler.name, this.exec.name, `Error executing SQL: ${err.message}`, err);
      return Promise.reject(err);
    }
  }

  public prepareStatement(sql: string): any {
    this.logger.info(DatabaseHandler.name, this.prepareStatement.name, `Preparing SQL statement: ${sql}`);
    try {
      const result = this.db.prepare(sql);
      this.logger.info(DatabaseHandler.name, this.prepareStatement.name, `SQL statement prepared successfully: ${JSON.stringify(result)}`);
      return Promise.resolve(result);
    } catch (err) {
      this.logger.error(DatabaseHandler.name, this.prepareStatement.name, `Error preparing SQL statement: ${err.message}`, err);
      return Promise.reject(err);
    }
  }
}