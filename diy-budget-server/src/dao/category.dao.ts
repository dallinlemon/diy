import Category from '../models/category.model';
import { TableNames, CategoriesColumns} from '../constants/dao.constants';
import DatabaseDao from './database.dao';
import { ReturnType } from '../models/return.type';
import DaoActions from '../models/interfaces/Dao.actions';

/**
 * Singleton dao class that interacts with the database.
 */
export default class CategoryDao extends DatabaseDao implements DaoActions {

  /**
   * Get the singleton instance of the database handler.
   * @returns {CategoryDao}
   * @static
   */
  public static async getInstance(): Promise<CategoryDao> {
    if (!CategoryDao.instance) {
      CategoryDao.instance = new CategoryDao(
        await CategoryDao.withDatabaseHandler()
      );
    }
    return CategoryDao.instance as CategoryDao;
  }

  public getAll(): Promise<Category[]> {
    return this.dbHandler.all(`SELECT * FROM ${TableNames.CATEGORIES}`);
  }

  public getById(id: number): Promise<Category> {
    return this.dbHandler.get(`SELECT * FROM ${TableNames.CATEGORIES} WHERE ${CategoriesColumns.ID} = ${id}`);
  }

  public getByGroupId(group_id: number): Promise<Category[]> {
    return this.dbHandler.all(`SELECT * FROM ${TableNames.CATEGORIES} WHERE ${CategoriesColumns.GROUP_ID} = ${group_id}`);
  }

  public insert(data: Category): Promise<ReturnType> {
    return this.dbHandler.run(
        `INSERT INTO ${TableNames.CATEGORIES} (
          ${CategoriesColumns.GROUP_ID}, ${CategoriesColumns.NAME}, ${CategoriesColumns.NOTES})
          VALUES (${data.group_id}, "${data.name}", "${data.notes}")`);
  }

  public update(data: Category): Promise<ReturnType> {
    return this.dbHandler.run(`UPDATE ${TableNames.CATEGORIES} SET
      ${CategoriesColumns.GROUP_ID} = ${data.group_id},
      ${CategoriesColumns.NAME} = "${data.name}", ${CategoriesColumns.NOTES} = "${data.notes}"
      WHERE ${CategoriesColumns.ID} = ${data.id}`);
  }

  public deleteById(id: number): Promise<ReturnType> {
    return this.dbHandler.run(`DELETE FROM ${TableNames.CATEGORIES} WHERE ${CategoriesColumns.ID} = ${id}`);
  }
}
