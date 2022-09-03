import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { databasePath, databaseName, databaseExtension } from "../constants/dao.constants";
import BaseClass from '../services/base-class';
import DatabaseHandler from '../services/database.handler';
import FileManagerService from '../services/file-manager.service';

type DatabaseDaoOption = (h: DatabaseDao) => void;
/**
 * Singleton dao class that interacts with the database.
 */
export default abstract class DatabaseDao extends BaseClass {
  protected static instance: DatabaseDao;
  protected dbHandler;
  protected databaseHandler: DatabaseHandler;

  /**
   * Creates a new database handler object.
   * @constructor
   * @private use getInstance()
   */
  public constructor(...options: DatabaseDaoOption[]) {
    super();
    this.fileManagerService = new FileManagerService();
    options.forEach((option) => {
      option(this);
    });
  }

  public static async withDatabaseHandler(): Promise<DatabaseDaoOption> {
    const tempDbHandler = await DatabaseHandler.getInstance();

    return (h: DatabaseDao) => {
      h.dbHandler = tempDbHandler;
    };
  }

  public async closeDatabase(): Promise<boolean> {
    return this.dbHandler.closeDatabase();
  }

  // // TODO - add methods to update, delete, insert that accept an array and execute them all in a single transaction
  // public abstract getAll(): Promise<any[]>;
  // public abstract getById(id: number): Promise<any>;
  // public abstract insert(data: DatabaseItemModel): Promise<ReturnType>;
  // public abstract update(data: DatabaseItemModel): Promise<ReturnType>;
  // public abstract deleteById(id: number): Promise<ReturnType>;

}
