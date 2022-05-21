import NamedItem from "./named-item.model";


/**
 * DatabaseItem Model
 */
export default abstract class UserIdItemModel extends NamedItem {

  constructor(
    id: number,
    public user_id: number,
    name: string,
    created_at: Date,
    notes?: string,
  ) {
    super(
      id,
      created_at,
      name,
      notes,
    );
  }

  /**
   * Gets the User Id of the object.
   * @returns {number}
   */
  getUserId(): number {
    return this.user_id;
  }

  /**
   * Sets the user_id of the object.
   * @param {number} user_id
   */
  setUserId(user_id: number): void {
    this.user_id = user_id;
  }
}
