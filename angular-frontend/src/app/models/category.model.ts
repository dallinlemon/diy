import NamedItem from "./named-item.model";

/**
 * Category Model
 */
export default class Category extends NamedItem {

  constructor(
    id: number,
    public group_id: number,
    name: string,
    public assigned: Map<string, number>,
    created_at: Date,
    notes?: string,
  ) {
    super(id, created_at, name, notes);
  }

  public getAssigned(date: Date): number {
    this.logger.debug(Category.name, 'getAssigned', `was called with ${date}`);
    this.logger.debug(Category.name, 'getAssigned', this.formatAssignedKey(date));
    const result = this.assigned.get(this.formatAssignedKey(date)) ?? 0;
    this.logger.debug(Category.name, 'getAssigned', `returned ${result}`);
    return result;
  }
  public setAssigned(date: Date | string, value: number): void {
    this.logger.debug(Category.name, 'setAssigned', `was called with ${value}`);
    const finalDateKey = (date instanceof Date) ? this.formatAssignedKey(date) : date
    this.assigned.set(finalDateKey, value);
  }

  protected formatAssignedKey(date: Date): string {
    this.logger.debug(Category.name, 'formatAssignedKey', `was called with ${date}`);
    return `${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
  }
}
