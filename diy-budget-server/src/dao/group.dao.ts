import Group from '../models/group.model';
import { GroupColumns, TableNames } from '../constants/dao.constants';
import DatabaseDao from './database.dao';
import { ReturnType } from '../models/return.type';
import DaoActions from '../models/interfaces/Dao.actions';
/**
 * Singleton dao class that interacts with the database.
 */
export default class GroupDao extends DatabaseDao implements DaoActions {

  /**
   * Get the singleton instance of the database handler.
   * @returns {GroupDao}
   * @static
   */
  public static async getInstance(): Promise<GroupDao> {
    if (!GroupDao.instance) {
      GroupDao.instance = new GroupDao(
        await GroupDao.withDatabaseHandler()
      );
    }
    return GroupDao.instance as GroupDao;
  }

  public getAll(): Promise<Group[]> {
    return this.dbHandler.all(`SELECT * FROM ${TableNames.CATEGORIES}`);
  }

  public getById(id: number): Promise<Group> {
    return this.dbHandler.get(`SELECT * FROM ${TableNames.CATEGORIES} WHERE ${GroupColumns.ID} = ${id}`);
  }

  public getByBudgetId(budget_id: number): Promise<Group[]> {
    return this.dbHandler.all(`SELECT * FROM ${TableNames.CATEGORIES} WHERE ${GroupColumns.BUDGET_ID} = ${budget_id}`);
  }

  public insert(data: Group): Promise<ReturnType> {
    return this.dbHandler.run(
        `INSERT INTO ${TableNames.CATEGORIES} (
          ${GroupColumns.BUDGET_ID}, ${GroupColumns.NAME}, ${GroupColumns.NOTES})
          VALUES (${data.budget_id}, "${data.name}", "${data.notes}")`);
  }

  public update(data: Group): Promise<ReturnType> {
    return this.dbHandler.run(`UPDATE ${TableNames.CATEGORIES} SET
      ${GroupColumns.BUDGET_ID} = ${data.budget_id},
      ${GroupColumns.NAME} = "${data.name}", ${GroupColumns.NOTES} = "${data.notes}"
      WHERE ${GroupColumns.ID} = ${data.id}`);
  }

  public deleteById(id: number): Promise<ReturnType> {
    return this.dbHandler.run(`DELETE FROM ${TableNames.CATEGORIES} WHERE ${GroupColumns.ID} = ${id}`);
  }
}
