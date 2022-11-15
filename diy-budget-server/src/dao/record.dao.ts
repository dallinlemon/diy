import Record from '../models/record.model';
import { ReturnType } from '../models/return.type';
import { RecordsColumns, TableNames } from '../constants/dao.constants';
import DatabaseDao from './database.dao';
import DaoActions from '../models/interfaces/Dao.actions';

/**
 * Singleton dao class that interacts with the database.
 */
export default class RecordDao extends DatabaseDao implements DaoActions {

  /**
   * Get the singleton instance of the database handler.
   * @returns {RecordDao}
   * @static
   */
  public static async getInstance(): Promise<RecordDao> {
    if (!RecordDao.instance) {
      RecordDao.instance = new RecordDao(
        await RecordDao.withDatabaseHandler()
      );
    }
    return RecordDao.instance as RecordDao;
  }
  // TODO - restrict the queries to the current user data or split databases
  public getAll(): Promise<Record[]> {
    return this.dbHandler.all(`SELECT * FROM ${TableNames.RECORDS}`);
  }

  public getById(id: number): Promise<Record> {
    return this.dbHandler.get(`SELECT * FROM ${TableNames.RECORDS} WHERE ${RecordsColumns.ID} = ${id}`);
  }

  public getByAccountId(account_id: number): Promise<Record[]> {
    return this.dbHandler.all(`SELECT * FROM ${TableNames.RECORDS} WHERE ${RecordsColumns.ACCOUNT_ID} = ${account_id}`);
  }

  // todo: add get by date range
  // todo: add get by certain date

  public insert(data: Record): Promise<ReturnType> {
    this.logger.info(RecordDao.name, 'insert', `Inserting record: ${JSON.stringify(data)}`);
    const sql = `INSERT INTO ${TableNames.RECORDS} (
      ${RecordsColumns.ACCOUNT_ID}, ${RecordsColumns.CATEGORY_ID}, ${RecordsColumns.DATE}, 
      ${RecordsColumns.PAYEE}, ${RecordsColumns.MEMO}, ${RecordsColumns.AMOUNT}, ${RecordsColumns.STATUS})
      VALUES (${data.account_id}, ${data.category_id}, '${data.date.toISOString()}', "${data.payee}", "${data.memo}", "${data.amount}", "${data.status}")`;
    this.logger.debug(RecordDao.name, 'insert', `Running sql string: ${sql}`);
    return this.dbHandler.run(sql);
  }

  public update(data: Record, id: number): Promise<ReturnType> {
    return this.dbHandler.run(`UPDATE ${TableNames.RECORDS} SET
      ${RecordsColumns.ACCOUNT_ID} = ${data.account_id},
      ${RecordsColumns.DATE} = "${data.date}",
      ${RecordsColumns.PAYEE} = "${data.payee}",
      ${RecordsColumns.MEMO} = "${data.memo}",
      ${RecordsColumns.PAYEE} = "${data.payee}"
      WHERE ${RecordsColumns.ID} = ${id}`);
  }

  public deleteById(id: number): Promise<ReturnType> {
    return this.dbHandler.run(`DELETE FROM ${TableNames.RECORDS} WHERE ${RecordsColumns.ID} = ${id}`);
  }


  public updateAll(data: Record[]): Promise<boolean> {
    try {
      const stmt = this.dbHandler.prepareStatement(`UPDATE ${TableNames.RECORDS} SET
        ${RecordsColumns.ACCOUNT_ID} = ?,
        ${RecordsColumns.DATE} = ?,
        ${RecordsColumns.PAYEE} = ?,
        ${RecordsColumns.MEMO} = ?,
        ${RecordsColumns.PAYEE} = ?
        WHERE ${RecordsColumns.ID} = ?`);
        
      data.forEach((record) => {
        stmt.run(record.account_id, record.date, record.payee, record.memo, record.payee, record.id);
      });
      return Promise.resolve(true);

    } catch (error) {
      this.logger.error(RecordDao.name, 'updateAll', 'error occurred while updating records', error);
      return Promise.reject(error);
    }
  }
}
