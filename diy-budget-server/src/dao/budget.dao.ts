import Budget from "shared/models/budget.model";
import { BudgetsColumns, TableNames } from "../constants/dao.constants";
import DatabaseDao from "./database.dao";
import { ReturnType } from "./return.type";

/**
 * Singleton dao class that interacts with the database.
 */
export default class BudgetDao extends DatabaseDao {

  /**
   * Get the singleton instance of the database handler.
   * @returns {BudgetDao}
   * @static
   */
  public static async getInstance(): Promise<BudgetDao> {
    if (!BudgetDao.instance) {
      BudgetDao.instance = new BudgetDao(
        await BudgetDao.withOpenDatabase()
      );
    }
    return BudgetDao.instance as BudgetDao;
  }

  public getAll(): Promise<Budget[]> {
    return this.db.all(`SELECT * FROM ${TableNames.BUDGETS}`);
  }

  public getById(id: number): Promise<Budget> {
    return this.db.get(`SELECT * FROM ${TableNames.BUDGETS} WHERE ${BudgetsColumns.ID} = ${id}`);
  }

  public getByUserId(user_id: number): Promise<Budget[]> {
    return this.db.all(`SELECT * FROM ${TableNames.BUDGETS} WHERE ${BudgetsColumns.USER_ID} = ${user_id}`);
  }

  public insert(data: Budget): Promise<ReturnType> {
    return this.db.run(
        `INSERT INTO ${TableNames.BUDGETS} (
          ${BudgetsColumns.USER_ID}, ${BudgetsColumns.NAME}, ${BudgetsColumns.NOTES})
          VALUES (${data.user_id}, "${data.name}", "${data.notes}")`);
  }

  public update(data: Budget): Promise<ReturnType> {
    return this.db.run(`UPDATE ${TableNames.BUDGETS} SET
      ${BudgetsColumns.USER_ID} = ${data.user_id},
      ${BudgetsColumns.NAME} = "${data.name}", ${BudgetsColumns.NOTES} = "${data.notes}"
      WHERE ${BudgetsColumns.ID} = ${data.id}`);
  }

  public deleteById(id: number): Promise<ReturnType> {
    return this.db.run(`DELETE FROM ${TableNames.BUDGETS} WHERE ${BudgetsColumns.ID} = ${id}`);
  }

}
