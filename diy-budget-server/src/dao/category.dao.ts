import Category from "shared/models/category.model";
import { TableNames, CategoriesColumns} from "../constants/dao.constants";
import DatabaseDao from "./database.dao";
import { ReturnType } from "./return.type";

/**
 * Singleton dao class that interacts with the database.
 */
export default class CategoryDao extends DatabaseDao {

  /**
   * Get the singleton instance of the database handler.
   * @returns {CategoryDao}
   * @static
   */
  public static async getInstance(): Promise<CategoryDao> {
    if (!CategoryDao.instance) {
      CategoryDao.instance = new CategoryDao(
        await CategoryDao.withOpenDatabase()
      );
    }
    return CategoryDao.instance as CategoryDao;
  }

  public getAll(): Promise<Category[]> {
    return this.db.all(`SELECT * FROM ${TableNames.CATEGORIES}`);
  }

  public getById(id: number): Promise<Category> {
    return this.db.get(`SELECT * FROM ${TableNames.CATEGORIES} WHERE ${CategoriesColumns.ID} = ${id}`);
  }

  public getByGroupId(group_id: number): Promise<Category[]> {
    return this.db.all(`SELECT * FROM ${TableNames.CATEGORIES} WHERE ${CategoriesColumns.GROUP_ID} = ${group_id}`);
  }

  public insert(data: Category): Promise<ReturnType> {
    return this.db.run(
        `INSERT INTO ${TableNames.CATEGORIES} (
          ${CategoriesColumns.GROUP_ID}, ${CategoriesColumns.NAME}, ${CategoriesColumns.NOTES})
          VALUES (${data.group_id}, "${data.name}", "${data.notes}")`);
  }

  public update(data: Category): Promise<ReturnType> {
    return this.db.run(`UPDATE ${TableNames.CATEGORIES} SET
      ${CategoriesColumns.GROUP_ID} = ${data.group_id},
      ${CategoriesColumns.NAME} = "${data.name}", ${CategoriesColumns.NOTES} = "${data.notes}"
      WHERE ${CategoriesColumns.ID} = ${data.id}`);
  }

  public deleteById(id: number): Promise<ReturnType> {
    return this.db.run(`DELETE FROM ${TableNames.CATEGORIES} WHERE ${CategoriesColumns.ID} = ${id}`);
  }
}
