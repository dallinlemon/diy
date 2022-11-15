import NamedItem from "./named-item.model";

/**
 * Group Model
 */
export default class Group extends NamedItem {
  private _show: 0 | 1;
  constructor(
    id: number,
    public budget_id: number,
    name: string,
    show: boolean,
    created_at: Date,
    notes?: string,
  ) {
    super(id, created_at, name, notes);
    this._show = show ? 1 : 0;
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
   * Gets the toggle state of the object.
   * @returns {boolean}
   */
  get show(): boolean {
    return (this._show === 1) ? true : false; 
  }

  /**
   * Sets the toggle state of the object.
   * @param {boolean} show should show on the frontend
   */
  set show(show: boolean) {
    this._show = show ? 1 : 0;
  }
}
