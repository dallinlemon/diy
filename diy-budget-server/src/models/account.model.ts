import NamedItem from "./named-item.model";

/**
 * Account Model
 */
export default class Account extends NamedItem {

  constructor(
    id: number,
    public user_id: number,
    public budget_id: number,
    name: string,
    public active: boolean,
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

  /**
   * Gets the active status of the object.
   * @returns {boolean}
   */
  getActive(): boolean {
    return this.active;
  }

  /**
   * Sets the active status of the object.
   * @param {boolean} active
   */
  setActive(active: boolean): void {
    this.active = active;
  }
}
