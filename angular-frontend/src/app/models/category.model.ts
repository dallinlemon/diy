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
    return this.assigned.get(this.formatAssignedKey(date)) ?? 0;
  }
  public setAssigned(date: Date | string, value: number): void {
    this.assigned.set((date instanceof Date) ? this.formatAssignedKey(date) : date, value);
  }

  protected formatAssignedKey(date: Date): string {
    return `${date.getUTCMonth()}/${date.getUTCFullYear()}`;
  }
}
