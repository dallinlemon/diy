
export const databasePath: string = '../tmp/';
export const databaseName: string = 'database.db';
export enum TableNames {
  users = 'users',
  budgets = 'budgets',
  categories = 'categories',
  transactions = 'transactions',
  accounts = 'accounts',
  groups = 'groups',
  records = 'records',
}
export enum UserColumns {
  ID = 'id',
  USERNAME = 'username',
  PASSWORD = 'password',
  EMAIL = 'email',
  FIRST_NAME = 'first_name',
  lAST_NAME = 'last_name',
  CREATED_AT = 'created_at'
}
