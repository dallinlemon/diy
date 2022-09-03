import DatabaseItemModel from '../database-item.model';
import { ReturnType } from '../return.type';

export default interface DaoActions {
  getAll(): Promise<any[]>;
  getById(id: number): Promise<any>;
  insert(data: DatabaseItemModel): Promise<ReturnType>;
  update(data: DatabaseItemModel): Promise<ReturnType>;
  deleteById(id: number): Promise<ReturnType>;
}
