import NamedItem from "./named-item.model";

/**
 * Group Model
 */
export default class Group extends NamedItem {

  constructor(
    id: number,
    public budget_id: number,
    name: string,
    created_at: Date,
    notes?: string,
  ) {
    super(id, created_at, name, notes);
  }

  /**
   * Gets the Budget Id of the object.
   * @returns {number}
   */
  getBudgetId(): number {
    return this.budget_id;
  }

  /**
   * Sets the Budget Id of the object.
   * @param {number} budget_id
   */
  setBudgetId(budget_id: number): void {
    this.budget_id = budget_id;
  }
}
