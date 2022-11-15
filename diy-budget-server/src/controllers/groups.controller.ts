import GroupsService from '../services/groups.service';
import BaseController from './base.controller';
import { Request, Response } from 'express-serve-static-core';


export default class GroupsController extends BaseController {
  protected groupsService: GroupsService;
  /**
   * Creates a new instance of the GroupsController and initializes the GroupsController.
   * @returns new instance of GroupsController
   */
  constructor() {
    super();
  }

  public async handleResponse(res: Response, data: any): Promise<void> {
    this.logger.info(GroupsController.name, 'handleResponse', `Sending response: ${JSON.stringify(data)}`);
    res.status(200).send({data});
  }

  public async handleError(res: Response, err: any): Promise<void> {
    this.logger.error(GroupsController.name, 'handleError', `Error: `, err);
    res.status(500).send(err);
  }

  public async createGroup(req: Request, res: Response): Promise<void> {
    try {
      this.groupsService = await GroupsService.init();
      const record = await this.groupsService.createGroup(req.body);
      this.handleResponse(res, record);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  public async getAllGroups(_req: Request, res: Response): Promise<void> {
    try {
      this.groupsService = await GroupsService.init();
      const groups = await this.groupsService.getAllGroups();
      this.handleResponse(res, groups);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  public async getGroupById(req: Request, res: Response): Promise<void> {
    try {
      this.groupsService = await GroupsService.init();
      const group = await this.groupsService.getGroupById(Number.parseInt(req.params.id));
      this.handleResponse(res, group);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  public async getGroupsByBudgetId(req: Request, res: Response): Promise<void> {
    try {
      this.groupsService = await GroupsService.init();
      const groups = await this.groupsService.getByBudgetId(Number.parseInt(req.params.budgetId));
      this.handleResponse(res, groups);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  public async deleteGroup(req: Request, res: Response): Promise<void> {
    try {
      this.groupsService = await GroupsService.init();
      const record = await this.groupsService.deleteGroup(Number.parseInt(req.params.id));
      this.handleResponse(res, record);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  public async updateGroup(req: Request, res: Response): Promise<void> {
    try {
      this.groupsService = await GroupsService.init();
      const record = await this.groupsService.updateGroup(req.body, Number.parseInt(req.params.id));
      this.handleResponse(res, record);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  public async updateAll(req: Request, res: Response): Promise<void> {
    try {
      this.groupsService = await GroupsService.init();
      const result = await this.groupsService.updateAll(req.body);
      this.handleResponse(res, result);
    } catch (err) {
      this.handleError(res, err);
    }
  }


}