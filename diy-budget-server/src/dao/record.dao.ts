import Record from "shared/models/record.model";
import { ReturnType } from "./return.type";
import { RecordsColumns, TableNames } from "../constants/dao.constants";
import DatabaseDao from "./database.dao";

/**
 * Singleton dao class that interacts with the database.
 */
export default class RecordDao extends DatabaseDao {

  /**
   * Get the singleton instance of the database handler.
   * @returns {RecordDao}
   * @static
   */
  public static async getInstance(): Promise<RecordDao> {
    if (!RecordDao.instance) {
      RecordDao.instance = new RecordDao(
        await RecordDao.withOpenDatabase()
      );
    }
    return RecordDao.instance as RecordDao;
  }

  public getAll(): Promise<Record[]> {
    return this.db.all(`SELECT * FROM ${TableNames.RECORDS}`);
  }

  public getById(id: number): Promise<Record> {
    return this.db.get(`SELECT * FROM ${TableNames.RECORDS} WHERE ${RecordsColumns.ID} = ${id}`);
  }

  public getByAccountId(account_id: number): Promise<Record[]> {
    return this.db.all(`SELECT * FROM ${TableNames.RECORDS} WHERE ${RecordsColumns.ACCOUNT_ID} = ${account_id}`);
  }

  // todo: add get by date range
  // todo: add get by certain date

  public insert(data: Record): Promise<ReturnType> {
    return this.db.run(
        `INSERT INTO ${TableNames.RECORDS} (
          ${RecordsColumns.ACCOUNT_ID}, ${RecordsColumns.DATE}, ${RecordsColumns.PAYEE},
          ${RecordsColumns.MEMO}, ${RecordsColumns.AMOUNT})
          VALUES (${data.account_id}, ${data.date}, "${data.payee}", "${data.memo}", "${data.amount}")`);
  }

  public update(data: Record): Promise<ReturnType> {
    return this.db.run(`UPDATE ${TableNames.RECORDS} SET
      ${RecordsColumns.ACCOUNT_ID} = ${data.account_id},
      ${RecordsColumns.DATE} = ${data.date},
      ${RecordsColumns.PAYEE} = "${data.payee}",
      ${RecordsColumns.MEMO} = "${data.memo}",
      ${RecordsColumns.PAYEE} = "${data.payee}"
      WHERE ${RecordsColumns.ID} = ${data.id}`);
  }

  public deleteById(id: number): Promise<ReturnType> {
    return this.db.run(`DELETE FROM ${TableNames.RECORDS} WHERE ${RecordsColumns.ID} = ${id}`);
  }
}
