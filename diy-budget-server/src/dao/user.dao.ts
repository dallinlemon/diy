import User from 'shared/models/user.model';
import { TableNames, UserColumns } from "../constants/dao.constants";
import DatabaseDao from "./database.dao";
import { ReturnType } from "./return.type";

/**
 * Singleton dao class that interacts with the database.
 */
export default class UserDao extends DatabaseDao {

  /**
   * Get the singleton instance of the database handler.
   * @returns {UserDao}
   * @static
   */
  public static async getInstance(): Promise<UserDao> {
    if (!UserDao.instance) {
      UserDao.instance = new UserDao(
        await UserDao.withOpenDatabase()
      );
    }
    return UserDao.instance as UserDao;
  }

  public getAll(): Promise<User> {
    return this.db.all(`SELECT * FROM ${TableNames.USERS}`);
  }

  public getById(id: number): Promise<User> {
    return this.db.get(`SELECT * FROM ${TableNames.USERS} WHERE ${UserColumns.ID} = ${id}`);
  }

  public insert(data: User): Promise<ReturnType> {
    return this.db.run(
        `INSERT INTO ${TableNames.USERS} (${UserColumns.USERNAME}, ${UserColumns.PASSWORD},
          ${UserColumns.FIRST_NAME}, ${UserColumns.lAST_NAME})
          VALUES (${data.username}, ${data.password}, ${data.first_name}, ${data.last_name})`);
  }

  public update(data: User): Promise<ReturnType> {
    return this.db.run(`UPDATE ${TableNames.USERS} SET ${UserColumns.USERNAME} = ${data.username},
      ${UserColumns.PASSWORD} = ${data.password}, ${UserColumns.FIRST_NAME} = ${data.first_name},
      ${UserColumns.lAST_NAME} = ${data.last_name}
      WHERE ${UserColumns.ID} = ${data.id}`);
  }

  public deleteById(id: number): Promise<ReturnType> {
    return this.db.run(`DELETE FROM ${TableNames.USERS} WHERE ${UserColumns.ID} = ${id}`);
  }

}
