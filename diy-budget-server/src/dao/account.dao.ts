import Account from "shared/models/account.model";
import { AccountsColumns, TableNames} from "../constants/dao.constants";
import DatabaseDao from "./database.dao";
import { ReturnType } from "./return.type";

/**
 * Singleton dao class that interacts with the database.
 */
export default class AccountDao extends DatabaseDao {

  /**
   * Get the singleton instance of the database handler.
   * @returns {AccountDao}
   * @static
   */
  public static async getInstance(): Promise<AccountDao> {
    if (!AccountDao.instance) {
      AccountDao.instance = new AccountDao(
        await AccountDao.withOpenDatabase()
      );
    }
    return AccountDao.instance as AccountDao;
  }

  public getAll(): Promise<Account[]> {
    return this.db.all(`SELECT * FROM ${TableNames.ACCOUNTS}`);
  }

  public getById(id: number): Promise<Account> {
    return this.db.get(`SELECT * FROM ${TableNames.ACCOUNTS} WHERE ${AccountsColumns.ID} = ${id}`);
  }

  public getByBudgetId(budget_id: number): Promise<Account[]> {
    return this.db.all(`SELECT * FROM ${TableNames.ACCOUNTS} WHERE ${AccountsColumns.BUDGET_ID} = ${budget_id}`);
  }

  public getActiveAccounts(): Promise<Account[]> {
    return this.db.all(`SELECT * FROM ${TableNames.ACCOUNTS} WHERE ${AccountsColumns.ACTIVE} = 1`);
  }

  public insert(data: Account): Promise<ReturnType> {
    return this.db.run(
        `INSERT INTO ${TableNames.ACCOUNTS} ( ${AccountsColumns.BUDGET_ID},
          ${AccountsColumns.NAME}, ${AccountsColumns.NOTES}, ${AccountsColumns.ACTIVE})
          VALUES (${data.budget_id}, "${data.name}", "${data.notes}", ${data.active})`);
  }

  public update(data: Account): Promise<ReturnType> {
    return this.db.run(`UPDATE ${TableNames.ACCOUNTS} SET 
      ${AccountsColumns.BUDGET_ID} = ${data.budget_id},
      ${AccountsColumns.NAME} = "${data.name}", ${AccountsColumns.NOTES} = "${data.notes}",
      ${AccountsColumns.ACTIVE} = ${data.active}
      WHERE ${AccountsColumns.ID} = ${data.id}`);
  }

  public deleteById(id: number): Promise<ReturnType> {
    return this.db.run(`DELETE FROM ${TableNames.ACCOUNTS} WHERE ${AccountsColumns.ID} = ${id}`);
  }
}
