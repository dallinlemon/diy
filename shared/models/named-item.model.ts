import DatabaseItemModel from "./database-item.model";

/**
 * DatabaseItem Model
 */
export default abstract class NamedItem extends DatabaseItemModel {

  constructor(
    id: number,
    created_at: Date,
    public name: string,
    public notes?: string,
  ) {
    super(id, created_at);
  }

  /**
   * Gets the name property of the object.
   * @returns {string}
   */
  getName(): string {
    return this.name;
  }

  /**
   * Gets the Notes of the object.
   */
  getNotes(): string | undefined {
    return this.notes;
  }

  /**
   * Sets the Created At of the object.
   * @param {string} name
   */
  setName(name: string): void {
    this.name = name;
  }

  /**
   * Sets the Notes of the object.
   * @param {string | undefined} notes
   */
  setNotes(notes: string | undefined): void {
    this.notes = notes;
  }
}
