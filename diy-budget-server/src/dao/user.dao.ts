import DatabaseItem from "shared/models/database-item.model";
import User from 'shared/models/user.model';
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { TableNames, UserColumns } from "../constants/dao.constants";
import { LoggerService } from "../services/logger.service";
import DatabaseDao from "./database.dao";

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
    return UserDao.instance;
  }

  public getAll(): Promise<User> {
    return this.db.all(`SELECT * FROM ${TableNames.users}`);
  }

  public getById(id: number): Promise<User> {
    return this.db.get(`SELECT * FROM ${TableNames.users} WHERE ${UserColumns.ID} = ${id}`);
  }

  public insert(data: User): Promise<boolean> {
    return this.db.run(
        `INSERT INTO ${TableNames.users} (${UserColumns.USERNAME}, ${UserColumns.PASSWORD},
          ${UserColumns.EMAIL}, ${UserColumns.FIRST_NAME}, ${UserColumns.lAST_NAME})
          VALUES (${data.username}, ${data.password}, ${data.email}, ${data.first_name}, ${data.last_name})`);
  }

  public update(data: User): Promise<boolean> {
    return this.db.run(`UPDATE ${TableNames.users} SET ${UserColumns.USERNAME} = ${data.username}, ${UserColumns.EMAIL} = ${data.email},
      ${UserColumns.PASSWORD} = ${data.password}, ${UserColumns.FIRST_NAME} = ${data.first_name},
      ${UserColumns.lAST_NAME} = ${data.last_name}
      WHERE ${UserColumns.ID} = ${data.id}`);
  }

  public deleteById(id: number): Promise<boolean> {
    return this.db.run(`DELETE FROM ${TableNames.users} WHERE ${UserColumns.ID} = ${id}`);
  }

}
