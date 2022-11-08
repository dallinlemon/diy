import DatabaseItemModel from "./database-item.model";

/**
 * User Model
 */
export default class User extends DatabaseItemModel {
  constructor(
    id: number,
    public username: string,
    public password: string,
    public first_name:string,
    public last_name: string,
    created_at?: any,
    ) {
    super(id, created_at);
  }
}
