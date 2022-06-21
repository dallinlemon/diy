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
}
