import DatabaseItemModel from "./models/database-item.model";
import User from "./models/user.model";
import Record from "./models/record.model";
import Group from "./models/group.model";
import Category from "./models/category.model";
import Budget from "./models/budget.model";
import Account from "./models/account.model";

export type DatabaseItem = User | Record | Group | Category | Budget | Account;

const types = {
  DatabaseItemModel,
  User,
  Record,
  Group,
  Category,
  Budget,
  Account,
};

export default types;
