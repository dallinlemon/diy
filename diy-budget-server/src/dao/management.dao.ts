import { promises as fs } from 'fs';
import { AccountsColumns, backupsFolder, BudgetsColumns, CategoriesColumns, databaseExtension, databaseName, databasePath, GroupColumns, RecordsColumns, TableNames, UserColumns } from '../constants/dao.constants';
import ArchiveDBFileException from '../exceptions/dao/archive-db-File.exception';
import { BackupDatabaseOptions, ClearOptions } from '../models/backup-database.options';
import FileManagerService from '../services/file-manager.service';
import DatabaseDao from './database.dao';
import DatabaseHandler from '../services/database.handler';



export default class ManagementDao extends DatabaseDao {
  /**
     * Get the singleton instance of the database handler.
     * @returns {ManagementDao}
     * @static
     */
  public static async getInstance(): Promise<ManagementDao> {
    if (!ManagementDao.instance) {
      ManagementDao.instance = new ManagementDao(
        await ManagementDao.withDatabaseHandler()
      );
    }
    return ManagementDao.instance as ManagementDao;
  }

  public backupDB(options?: BackupDatabaseOptions): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.closeDatabase();
        await this.archiveDBFile();
        if (options && options.clearOptions) {
          this.logger.info(ManagementDao.name, this.backupDB.name, `Clear options found. Clearing database.`);
          await this.clearDatabase(options.clearOptions);
        }
        resolve(true);
      } catch (error) {
        if (error instanceof ArchiveDBFileException) {
          this.logger.debug(ManagementDao.name, this.backupDB.name, `Error archiving the database: ${error.message}`);
          reject(error);
        } else {
          this.logger.debug(ManagementDao.name, this.backupDB.name, `Error creating database: ${error.message}`);
          return reject(false);
        }
      }
    });
  }

  protected async clearDatabase(options: ClearOptions): Promise<boolean> {
    try {
      if (options.clearAll) {
        await this.deleteDBFile();
        await this.createDBFile();
        await this.createTables();
      } else if (options?.clearTables && options.clearTables.length > 0) {
        await this.clearTables(options.clearTables);
      }
    } catch (error) {
      this.logger.debug(ManagementDao.name, this.clearDatabase.name, `Error clearing database: ${error.message}`);
      return Promise.reject(error);
    }
  }

  protected async clearTables(tables: string[]): Promise<boolean> {
    try {
      for (const table of tables) {
        await this.clearTable(table);
      }
      return Promise.resolve(true);
    } catch (error) {
      this.logger.debug(ManagementDao.name, this.clearTables.name, `Error clearing tables: ${error.message}`);
      return Promise.reject(error);
    }
  }

  protected async clearTable(table: string): Promise<boolean> {
    try {
      this.logger.info(ManagementDao.name, this.clearTable.name, `Clearing table: ${table}`);
      await this.dbHandler.run(`DROP TABLE [IF_EXISTS] ${table}`);
      this.logger.info(ManagementDao.name, this.clearTable.name, `Table cleared: ${table}`);
      return Promise.resolve(true);
    } catch (error) {
      this.logger.debug(ManagementDao.name, this.clearTable.name, `Error clearing table: ${error.message}`);
      return Promise.reject(error);
    }
  }

  public async createTables(): Promise<boolean> {
    try {
      this.dbHandler['db'] = await DatabaseHandler.openDatabase();
      await this.createUsersTable();
      await this.createBudgetsTable();
      await this.createGroupsTable();
      await this.createCategoriesTable();
      await this.createAccountsTable();
      await this.createRecordsTable();
      return Promise.resolve(true);
    } catch (error) {
      this.logger.debug(ManagementDao.name, this.createTables.name, `Error creating tables: ${error.message}`);
      return Promise.reject(error);
    }
  }

  protected async createUsersTable(): Promise<boolean> {
    try {
      this.logger.info(ManagementDao.name, this.createUsersTable.name, `Creating users table`);
      await this.dbHandler.run(`CREATE TABLE IF NOT EXISTS ${TableNames.USERS} (
        ${UserColumns.ID} INTEGER PRIMARY KEY AUTOINCREMENT,
        ${UserColumns.USERNAME} TEXT NOT NULL,
        ${UserColumns.PASSWORD} TEXT NOT NULL,
        ${UserColumns.FIRST_NAME} TEXT NOT NULL,
        ${UserColumns.LAST_NAME} TEXT NOT NULL,
        ${UserColumns.CREATED_AT} DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);
      this.logger.info(ManagementDao.name, this.createUsersTable.name, `Users table created`);
      return Promise.resolve(true);
    } catch (error) {
      this.logger.debug(ManagementDao.name, this.createUsersTable.name, `Error creating users table: ${error.message}`);
      return Promise.reject(error);
    }
  }

  protected async createBudgetsTable(): Promise<boolean> {
    try {
      this.logger.info(ManagementDao.name, this.createUsersTable.name, `Creating budgets table`);
      await this.dbHandler.run(
        `Create TABLE IF NOT EXISTS ${TableNames.BUDGETS} (
          ${BudgetsColumns.ID} INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          ${BudgetsColumns.USER_ID} INTEGER NOT NULL,
          ${BudgetsColumns.NAME} TEXT,
          ${BudgetsColumns.NOTES} TEXT,
          ${BudgetsColumns.CREATED_AT} DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (${BudgetsColumns.USER_ID}) REFERENCES ${TableNames.USERS}(${UserColumns.ID})
        );`
      );
      this.logger.info(ManagementDao.name, this.createUsersTable.name, `Budgets table created`);
      return Promise.resolve(true);
    } catch (error) {
      this.logger.debug(ManagementDao.name, this.createBudgetsTable.name, `Error creating budgets table: ${error.message}`);
      return Promise.reject(error);
    }
  }

  protected async createRecordsTable(): Promise<boolean> {
    try {
      this.logger.info(ManagementDao.name, this.createUsersTable.name, `Creating records table`);
      await this.dbHandler.run(
        `Create TABLE IF NOT EXISTS ${TableNames.RECORDS} (
          ${RecordsColumns.ID} INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          ${RecordsColumns.ACCOUNT_ID} INTEGER NOT NULL,
          ${RecordsColumns.CATEGORY_ID} INTEGER NOT NULL,
          ${RecordsColumns.DATE} Date NOT NULL,
          ${RecordsColumns.PAYEE} TEXT NOT NULL,
          ${RecordsColumns.MEMO} TEXT,
          ${RecordsColumns.AMOUNT} Integer NOT NULL,
          ${RecordsColumns.STATUS} TEXT NOT NULL,
          ${RecordsColumns.CREATED_AT} DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (${RecordsColumns.ACCOUNT_ID}) REFERENCES ${TableNames.ACCOUNTS}(${AccountsColumns.ID})
          FOREIGN KEY (${RecordsColumns.CATEGORY_ID}) REFERENCES ${TableNames.CATEGORIES}(${CategoriesColumns.ID})
        );`
      );
      this.logger.info(ManagementDao.name, this.createUsersTable.name, `Records table created`);
      return Promise.resolve(true);
    } catch (error) {
      this.logger.debug(ManagementDao.name, this.createRecordsTable.name, `Error creating records table: ${error.message}`);
      return Promise.reject(error);
    }
  }

  protected async createAccountsTable(): Promise<boolean> {
    try {
      this.logger.info(ManagementDao.name, this.createUsersTable.name, `Creating accounts table`);
      await this.dbHandler.run(
        `Create TABLE IF NOT EXISTS ${TableNames.ACCOUNTS} (
          ${AccountsColumns.ID} INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          ${AccountsColumns.USER_ID} INTEGER NOT NULL,
          ${AccountsColumns.BUDGET_ID} INTEGER NOT NULL,
          ${AccountsColumns.NAME} TEXT NOT NULL,
          ${AccountsColumns.NOTES} TEXT,
          ${AccountsColumns.ACTIVE} BOOLEAN NOT NULL,
          ${AccountsColumns.CREATED_AT} DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (${AccountsColumns.BUDGET_ID}) REFERENCES ${TableNames.BUDGETS}(${AccountsColumns.ID})
          FOREIGN KEY (${AccountsColumns.USER_ID}) REFERENCES ${TableNames.USERS}(${UserColumns.ID})
        );`
      );
      this.logger.info(ManagementDao.name, this.createUsersTable.name, `Accounts table created`);
      return Promise.resolve(true);
    } catch (error) {
      this.logger.debug(ManagementDao.name, this.createAccountsTable.name, `Error creating accounts table: ${error.message}`);
      return Promise.reject(error);
    }
  }

  protected async createGroupsTable(): Promise<boolean> {
    try {
      this.logger.info(ManagementDao.name, this.createUsersTable.name, `Creating groups table`);
      await this.dbHandler.run(
        `Create TABLE IF NOT EXISTS ${TableNames.GROUPS} (
          ${GroupColumns.ID} INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          ${GroupColumns.BUDGET_ID} INTEGER NOT NULL,
          ${GroupColumns.NAME} TEXT NOT NULL,
          ${GroupColumns.SHOW} BOOLEAN NOT NULL,
          ${GroupColumns.NOTES} TEXT,
          ${GroupColumns.CREATED_AT} DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (${GroupColumns.BUDGET_ID}) REFERENCES ${TableNames.BUDGETS}(${BudgetsColumns.ID})
        );`
      );
      this.logger.info(ManagementDao.name, this.createUsersTable.name, `Groups table created`);
      return Promise.resolve(true);
    } catch (error) {
      this.logger.debug(ManagementDao.name, this.createGroupsTable.name, `Error creating groups table: ${error.message}`);
      return Promise.reject(error);
    }
  }

  protected async createCategoriesTable(): Promise<boolean> {
    try {
      this.logger.info(ManagementDao.name, this.createUsersTable.name, `Creating categories table`);
      await this.dbHandler.run(
        `Create TABLE IF NOT EXISTS ${TableNames.CATEGORIES} (
          ${CategoriesColumns.ID} INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          ${CategoriesColumns.GROUP_ID} INTEGER NOT NULL,
          ${CategoriesColumns.NAME} TEXT NOT NULL,
          ${CategoriesColumns.NOTES} TEXT,
          ${CategoriesColumns.CREATED_AT} DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (${CategoriesColumns.GROUP_ID}) REFERENCES ${TableNames.GROUPS}(${GroupColumns.ID})
        );`
      );
      this.logger.info(ManagementDao.name, this.createUsersTable.name, `Categories table created`);
      return Promise.resolve(true);
    } catch (error) {
      this.logger.debug(ManagementDao.name, this.createCategoriesTable.name, `Error creating categories table: ${error.message}`);
      return Promise.reject(error);
    }
  }

  protected async createDBFile(): Promise<boolean> {
    try {
      this.logger.info(ManagementDao.name, this.createDBFile.name, `Creating database file: ${databasePath}`);
      await fs.writeFile(databasePath, '');
      this.logger.info(ManagementDao.name, this.createDBFile.name, `Database file created: ${databasePath}`);
      return Promise.resolve(true);
    } catch (error) {
      this.logger.debug(ManagementDao.name, this.createDBFile.name, `Error creating database file: ${error.message}`);
      throw error; 
    }
  }

  protected async deleteDBFile(): Promise<boolean> {
    try {
      this.logger.info(ManagementDao.name, this.deleteDBFile.name, `Deleting database file: ${databasePath}`);
      await this.fileManagerService.deleteFile(databasePath);
      return Promise.resolve(true);
    } catch (error) {
      this.logger.debug(ManagementDao.name, this.deleteDBFile.name, `Error deleting database: ${error.message}`);
      return Promise.reject(new ArchiveDBFileException(error.message));
    }
  }

  protected async archiveDBFile(): Promise<boolean> {
    try {
      const newName = this.formatNewName(databaseName);
      this.logger.info(ManagementDao.name, this.archiveDBFile.name, `Archiving database file: ${databasePath}`);
      await this.fileManagerService.copyFile(databasePath, `${backupsFolder}${newName}${databaseExtension}`);
      return Promise.resolve(true);
    } catch (error) {
      this.logger.debug(ManagementDao.name, this.archiveDBFile.name, `Error archiving database: ${error.message}`);
      return Promise.reject(new ArchiveDBFileException(error.message));
    }
  }

  protected formatNewName(oldName: string): string {
    const date = new Date();
    const temp = oldName.split('.');
    const temp2 = `${temp[0]}_${date.toISOString()}`;
    return temp2.replace(/:/g, '-');
  }
}
