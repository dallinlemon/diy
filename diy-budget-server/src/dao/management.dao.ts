import { promises as fs } from 'fs';
import { backupsFolder, BudgetsColumns, databaseExtension, databaseName, databasePath, TableNames, UserColumns } from '../constants/dao.constants';
import ArchiveDBFileException from '../exceptions/dao/archive-db-File.exception';
import FileManagerService from '../services/file-manager.service';
import DatabaseDao from './database.dao';



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

  public backupDB(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.closeDatabase();
        await this.archiveDBFile();
        // this.createDBFile();
        // await this.createTables();
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

  public createTables(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await this.createBudgetTable();
    });
  }

  protected async createBudgetTable(): Promise<boolean> {
    try {
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
      return Promise.resolve(true);
    } catch (error) {
      this.logger.debug(ManagementDao.name, this.createBudgetTable.name, `Error creating budget table: ${error.message}`);
      return Promise.reject(error);
    }
  }

  protected async createDBFile(): Promise<boolean> {
    try {
      await fs.writeFile(`${databasePath}${databaseName}${databaseExtension}`, '');
    } catch (error) {
      this.logger.debug(ManagementDao.name, this.createDBFile.name, `Error creating database file: ${error.message}`);
      throw error; 
    }

    return true;
  }
  protected async archiveDBFile(): Promise<boolean> {
    try {
      const newName = this.formatNewName(databaseName);
      await this.fileManagerService.copyFile(databasePath, `${backupsFolder}${newName}${databaseExtension}`);
      console.log('should run');
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
