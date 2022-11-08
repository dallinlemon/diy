import User from '../models/user.model';
import UserDao from '../dao/user.dao';
import { BaseService } from './base-service';
import { ReturnType } from '../models/return.type';

export default class UserService extends BaseService {
  private static instance: UserService;
  private dao: UserDao;
  public static async getInstance(): Promise<UserService> {
    if (!UserService.instance) {
      UserService.instance = new UserService();
      this.instance.dao = await UserDao.getInstance();
    }
    return UserService.instance;
  }

  constructor() {
    super();
  }

  public getAll(): Promise<User[]> {
    return this.dao.getAll();
  }

  public getById(id: number): Promise<User> {
    return this.dao.getById(id);
  }

  public async insert(data: User): Promise<boolean> { 
    try {
      const result = await this.dao.insert(data);
      return (result && (result.changes > 0 && result.lastID)) ? true : false;
    } catch (error) {
      this.logger.error(UserService.name, 'insert', `Error inserting user:`, error);
      return Promise.reject(error);
    }
  }

  public update(data: User): Promise<ReturnType> {
    return this.dao.update(data);
  }

  public deleteById(id: number): Promise<ReturnType> {
    return this.dao.deleteById(id);
  }

}
