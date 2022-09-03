import DatabaseItemModel from "./database-item.model";

/**
 * Record Model
 */
export default class RecordIndex extends DatabaseItemModel {

  constructor(
    public record_id: number,
    public category_id: number,
    public name: string,
    public amount: number,
    public notes: string,
    created_at: Date,
  ) {
    super(null, created_at);
  }
}
