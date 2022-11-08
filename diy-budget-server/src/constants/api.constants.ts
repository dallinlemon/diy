const API_VERSION = '/v0.0.1';
const API_BASE_URL = 'http://host:3000/api' + API_VERSION;
const USER_ROUTER_URL_SECTION = '/users'; 
const MANAGEMENT_ROUTER_URL_SECTION = '/management';
const RECORDS_ROUTER_URL_SECTION = '/records';
const GROUPS_ROUTER_URL_SECTION = '/groups';
const CATEGORIES_ROUTER_URL_SECTION = '/categories';
const BUDGETS_ROUTER_URL_SECTION = '/budgets';
const ACCOUNTS_ROUTER_URL_SECTION = '/accounts';

/**
 * @property {string} API_VERSION - /v0.0.1
 * @property {string} API_BASE_URL - http://host:3000/api/v0.0.1
 * @property {string} UserRouter - http://host:3000/api/v0.0.1/users
 * @property {string} ManagementRouter - http://host:3000/api/v0.0.1/management
 * @property {string} RecordsRouter - http://host:3000/api/v0.0.1/records
 * @property {string} GroupsRouter - http://host:3000/api/v0.0.1/groups
 * @property {string} CategoriesRouter - http://host:3000/api/v0.0.1/categories
 * @property {string} BudgetsRouter - http://host:3000/api/v0.0.1/budgets
 * @property {string} AccountsRouter - http://host:3000/api/v0.0.1/accounts
 * 
 */
export const SERVER_ROUTER_URLS = {
  /** /v0.0.1 */
  API_VERSION,
  /** http://host:3000/api/v0.0.1 */
  API_BASE_URL,
  /** http://host:3000/api/v0.0.1/users */
  UserRouter: API_BASE_URL + USER_ROUTER_URL_SECTION,
  /** http://host:3000/api/v0.0.1/management */
  ManagementRouter: API_BASE_URL + MANAGEMENT_ROUTER_URL_SECTION,
  /** http://host:3000/api/v0.0.1/records */
  RecordsRouter: API_BASE_URL + RECORDS_ROUTER_URL_SECTION,
  /** http://host:3000/api/v0.0.1/groups */
  GroupsRouter: API_BASE_URL + GROUPS_ROUTER_URL_SECTION,
  /** http://host:3000/api/v0.0.1/categories */
  CategoriesRouter: API_BASE_URL + CATEGORIES_ROUTER_URL_SECTION,
  /** http://host:3000/api/v0.0.1/budgets */
  BudgetsRouter: API_BASE_URL + BUDGETS_ROUTER_URL_SECTION,
  /** http://host:3000/api/v0.0.1/accounts  */
  AccountsRouter: API_BASE_URL + ACCOUNTS_ROUTER_URL_SECTION
}