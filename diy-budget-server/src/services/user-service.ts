import User from "shared/models/user.model";
import UserDao from "../dao/user.dao";
import { BaseService } from "./base-service"
import { ReturnType } from "../dao/return.type";

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

  public insert(data: User): Promise<ReturnType> {
    return this.dao.insert(data);
  }

  public update(data: User): Promise<ReturnType> {
    return this.dao.update(data);
  }

  public deleteById(id: number): Promise<ReturnType> {
    return this.dao.deleteById(id);
  }

}
