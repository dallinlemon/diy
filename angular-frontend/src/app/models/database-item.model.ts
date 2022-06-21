
/**
 * DatabaseItem Model
 */
export default abstract class DatabaseItemModel {

  /**
   * creates instance of DatabaseItemModel.
   * @param {number} id Database id of this instance.
   * @param {Date} created_at Date this instance was first added to the database.
   */
  constructor(
    public id: number,
    public created_at: Date,
  ) {
    // intentionally left blank
  }

  /**
   * Gets the Id of the object.
   * @returns {number}
   */
  getId(): number {
    return this.id;
  }

  /**
   * Gets the Created At of the object.
   * @returns {Date}
   */
  getCreatedAt(): Date {
    return this.created_at;
  }

  /**
   * Sets the Id of the object.
   * @param {number} id
   */
  setId(id: number): void {
    this.id = id;
  }

  /**
   * Sets the Created At of the object.
   * @param {Date} created_at
   */
  setCreatedAt(created_at: Date): void {
    this.created_at = created_at;
  }
}
