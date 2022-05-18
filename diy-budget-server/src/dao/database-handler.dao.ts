import { rejects } from "assert";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

type DatabaseHandlerOption = (h: DatabaseHandler) => void
/**
 * Singleton dao class that interacts with the database.
 */
export default class DatabaseHandler {
  private static instance: DatabaseHandler;
  private db;
  private databasePath: string = '../data/';
  private databaseName: string = 'current.db';

  /**
   * Get the singleton instance of the database handler.
   * @returns {DatabaseHandler}
   * @static
   */
  public static async getInstance(): Promise<DatabaseHandler> {
    if (!DatabaseHandler.instance) {
      DatabaseHandler.instance = new DatabaseHandler(
        await DatabaseHandler.withOpenDatabase()
      );
    }
    return DatabaseHandler.instance;
  }

  /**
   * Creates a new database handler object.
   * @constructor
   * @private use getInstance()
   */
  private constructor(...options: DatabaseHandlerOption[]) {
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
      const tempDb = await open({
        filename: '../tmp/database.db',
        driver: sqlite3.Database
      });
      console.log('DatabaseHandler | Database connection established.');
      return tempDb;
    } catch (err) {
      console.log('Error opening database: ', err.message);
      Promise.reject(err);
    }
  }

  private async closeDatabase(): Promise<void> {
    try {
      await this.db.close();
    } catch (err) {
      console.log('Error closing database: ', err.message);
    }
  }

  public async createDatabase(tableName: string, tableSchema: string): Promise<void> {

  }

  public async createTable(tableName: string, tableSchema: string): Promise<void> {
    await this.db.exec('CREATE TABLE tbl (col TEXT)')
    await this.db.exec('INSERT INTO tbl VALUES ("test")')
  }





}

(async () => {
  const temp = await DatabaseHandler.getInstance();
  temp.createTable('test', 'test');
})()

