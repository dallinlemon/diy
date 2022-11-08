import { TableNames } from '../constants/dao.constants';

export interface BackupDatabaseOptions {

  clearOptions?: ClearOptions;

}

/** 
 * Clear Options
 * @property {boolean} clearAll - Clear all data from the database
 * @property {TableNames[]} clearTables - Array of table names to clear
 */
export interface ClearOptions {
  /** true = clear database after backup */
  clearAll?: boolean;
  /** Array of table names to clear.*/
  clearTables?: TableNames[];
}