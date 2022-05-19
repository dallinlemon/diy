import DatabaseItemModel from "./database-item.model";

/**
 * User Model
 */
export default class User extends DatabaseItemModel {

  constructor(
    public id: number,
    public username: string,
    public password: string,
    public email: string,
    public first_name:string,
    public last_name: string,
    public created_at: any
    ) {
    super();
  }
}
