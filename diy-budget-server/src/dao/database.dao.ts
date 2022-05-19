import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { DatabaseItem } from "shared/types";
import { LoggerService } from "../services/logger.service";
import { databasePath, databaseName } from "../constants/dao.constants";

type DatabaseDaoOption = (h: DatabaseDao) => void;
/**
 * Singleton dao class that interacts with the database.
 */
export default abstract class DatabaseDao {
  protected static instance: DatabaseDao;
  private static staticLogger: LoggerService = LoggerService.getInstance();
  protected db;
  private logger: LoggerService = LoggerService.getInstance();

  /**
   * Creates a new database handler object.
   * @constructor
   * @private use getInstance()
   */
  public constructor(...options: DatabaseDaoOption[]) {
    options.forEach((option) => {
      option(this);
    });
  }

  public static async withOpenDatabase(): Promise<DatabaseDaoOption> {
    const tempDb = await DatabaseDao.openDatabase();
    return (h: DatabaseDao) => {
      h.db = tempDb;
    };
  }

  public static async openDatabase(): Promise<any> {
    try {
      const tempDb = await open({
        filename: `${databasePath}${databaseName}`,
        driver: sqlite3.Database
      });
      this.staticLogger.debug(DatabaseDao.name, this.openDatabase.name, 'Database connection established.');
      return tempDb;
    } catch (err) {
      this.staticLogger.debug(DatabaseDao.name, this.openDatabase.name, `Error opening database: ${err.message}`);
      Promise.reject(err);
    }
  }

  private async closeDatabase(): Promise<boolean> {
    try {
      await this.db.close();
      this.logger.debug(DatabaseDao.name, this.closeDatabase.name, 'DatabaseDao | Database connection terminated.');
      return true;
    } catch (err) {
      this.logger.debug(DatabaseDao.name, this.closeDatabase.name, `Error closing database: ${err.message}`);
      return false;
    }
  }

  // TODO - add methods to update, delete, insert that accept an array and execute them all in a single transaction
  public abstract getAll(): Promise<any>;
  public abstract getById(id: number): Promise<any>;
  public abstract insert(data: DatabaseItem): Promise<boolean>;
  public abstract update(data: DatabaseItem): Promise<boolean>;
  public abstract deleteById(id: number): Promise<boolean>;

}
