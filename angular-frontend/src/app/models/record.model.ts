import DatabaseItemModel from "./database-item.model";

/**
 * Record Model
 */
export default class Record extends DatabaseItemModel {

  constructor(
    id: number,
    public account_id: number,
    public category_id: number,
    public date: Date,
    public payee: string,
    public memo: string,
    public amount: number,
    created_at: Date,
  ) {
    super(id, created_at);
  }

  /**
    * Helper method to convert VO to model
    * @returns Record
  */
  public static init(config: Record) {
    return new Record(
      config.id,
      config.account_id,
      config.category_id,
      config.date,
      config.payee,
      config.memo,
      config.amount,
      config.created_at
    );
  }
}
