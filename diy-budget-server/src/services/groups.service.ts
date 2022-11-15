import GroupDao from '../dao/group.dao';
import Group from '../models/group.model';
import { BaseService } from './base-service';

export default class GroupsService extends BaseService {
  public dao: GroupDao;

  /**
   * Creates a new instance of the GroupsService and initializes the DAO.
   * @returns new instance of GroupsService
   */
  public static async init(): Promise<GroupsService> {
    const newGroupsService = new GroupsService();
    newGroupsService.dao = await GroupDao.getInstance();
    return newGroupsService;
  }

  /**
   * Use init method instead of constructor.
   */
  protected constructor() {
    super();
  }

  /**
   * Create a new Group.
   * @param group the Group to create
   * @returns the ID of the created record
   */
  public async createGroup(group: Group): Promise<number> {
    this.logger.info(GroupsService.name, 'createRecord', `Creating record: ${group}`);
    this.dao = await GroupDao.getInstance();
    const result = await this.dao.insert(group);
    return result.lastID;
  }

  public async getAllGroups(): Promise<Group[]> {
    this.logger.info(GroupsService.name, 'getAllGroups', `Getting all groups`);
    this.dao = await GroupDao.getInstance();
    return this.dao.getAll();
  }

  public async getGroupById(id: number): Promise<Group> {
    this.logger.info(GroupsService.name, 'getGroupById', `Getting group by id: ${id}`);
    this.dao = await GroupDao.getInstance();
    return this.dao.getById(id);
  }

  public async getByBudgetId(budgetId: number): Promise<Group[]> {
    this.logger.info(GroupsService.name, 'getByBudgetId', `Getting group by account id: ${budgetId}`);
    this.dao = await GroupDao.getInstance();
    return this.dao.getByBudgetId(budgetId);
  }

  public async updateGroup(group: Group, id: number): Promise<void> {
    this.logger.info(GroupsService.name, 'updateGroup', `Updating group: ${JSON.stringify(group)}`);
    this.dao = await GroupDao.getInstance();
    await this.dao.update(group, id);
  }

  public async deleteGroup(id: number): Promise<void> {
    this.logger.info(GroupsService.name, 'deleteGroup', `Deleting group: ${id}`);
    this.dao = await GroupDao.getInstance();
    await this.dao.deleteById(id);
  }

  public async updateAll(records: Group[]): Promise<boolean> {
    this.logger.info(GroupsService.name, 'updateAll', `Updating all group`);
    this.dao = await GroupDao.getInstance();
    return this.dao.updateAll(records);
  }
}