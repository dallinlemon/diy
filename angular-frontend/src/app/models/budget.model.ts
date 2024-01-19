import UserIdItemModel from "./user-id-item.model";

/**
 * Budget Model
 */
export default class Budget extends UserIdItemModel {
  constructor(
    id: number,
    user_id: number,
    name: string,
    created_at: Date,
    notes?: string,
  ) {
    super(id, user_id, name, created_at, notes);
  }
}
