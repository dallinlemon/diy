import DatabaseDao from "./database.dao";
import RecordIndex from "../models/record-index.model";
import { ReturnType } from "../models/return.type";
import { RecordIndexColumns, TableNames } from "../constants/dao.constants";
import DaoActions from '../models/interfaces/Dao.actions';

/**
 * Singleton dao class that interacts with the database.
 */
export default class RecordIndexDao extends DatabaseDao implements DaoActions {

  /**
   * Get the singleton instance of the database handler.
   * @returns {RecordDao}
   * @static
   */
  public static async getInstance(): Promise<RecordIndexDao> {
    if (!RecordIndexDao.instance) {
      RecordIndexDao.instance = new RecordIndexDao(
        await RecordIndexDao.withDatabaseHandler()
      );
    }
    return RecordIndexDao.instance as RecordIndexDao;
  }

  public getAll(): Promise<RecordIndex[]> {
    return this.dbHandler.all(`SELECT * FROM ${TableNames.RECORD_INDEX}`);
  }

  public getByIds(record_id: number, category_id: number): Promise<RecordIndex> {
    return this.dbHandler.get(`SELECT * FROM ${TableNames.RECORD_INDEX} WHERE
    ${RecordIndexColumns.RECORD_ID} = ${record_id}
    AND ${RecordIndexColumns.CATEGORY_ID} = ${category_id}`);
  }

  public insert(data: RecordIndex): Promise<ReturnType> {
    return this.dbHandler.run(
      `INSERT INTO ${TableNames.RECORD_INDEX} (
        ${RecordIndexColumns.RECORD_ID}, ${RecordIndexColumns.CATEGORY_ID}, ${RecordIndexColumns.NAME},
        ${RecordIndexColumns.AMOUNT}, ${RecordIndexColumns.NOTES})
        VALUES (${data.record_id}, ${data.category_id}, "${data.name}", "${data.amount}", "${data.notes}")`);
      }

  public update(data: RecordIndex): Promise<ReturnType> {
    return this.dbHandler.run(`UPDATE ${TableNames.RECORD_INDEX} SET
    ${RecordIndexColumns.RECORD_ID} = ${data.record_id},
    ${RecordIndexColumns.CATEGORY_ID} = ${data.category_id},
    ${RecordIndexColumns.NAME} = "${data.name}",
    ${RecordIndexColumns.AMOUNT} = "${data.amount}",
    ${RecordIndexColumns.NOTES} = "${data.notes}"
    WHERE ${RecordIndexColumns.RECORD_ID} = ${data.record_id}
    AND ${RecordIndexColumns.CATEGORY_ID} = ${data.category_id}`);
  }

  public deleteById(record_id: number): Promise<ReturnType> {
    return this.dbHandler.run(`DELETE FROM ${TableNames.RECORD_INDEX} WHERE ${RecordIndexColumns.RECORD_ID} = ${record_id}`);
  }

  public getById(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

