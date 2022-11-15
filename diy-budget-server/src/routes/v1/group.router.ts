import express, { NextFunction } from "express";
import { Request, Response } from "express-serve-static-core";
import { SERVER_ROUTER_URLS } from '../../constants/api.constants';
import GroupsController from '../../controllers/groups.controller';
import { LoggerService } from '../../services/logger.service';


const groupsRouter = express.Router();
const logger = LoggerService.getInstance();
groupsRouter.get('/',
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    logger.trace('GroupsRouter', 'GET', `${SERVER_ROUTER_URLS.GroupsRouter}/ was hit.`);
    try {
      const groupsController = new GroupsController();
      await groupsController.getAllGroups(req, res);
    } catch (err) {
      res.status(500).json({error: `Encountered an unexpected error: ${err}`}); 
    }
  }
);

groupsRouter.post('/', [
  async (req: Request, res: Response, _next: NextFunction) => {
    logger.trace('GroupsRouter', 'POST', `${SERVER_ROUTER_URLS.GroupsRouter}/ was hit.`);
    try {
      const groupsController = new GroupsController();
      await groupsController.createGroup(req, res);
    } catch (error) {
      logger.debug('GroupsRouter', 'POST /', `Encountered an unexpected error: ${error}`);
      res.status(500).json({error: `Encountered an unexpected error: ${error}`});
    }
  }
]);

groupsRouter.put('/record/:id', [
  async (req: Request, res: Response, _next: NextFunction) => {
    logger.trace('GroupsRouter', 'PUT', `${SERVER_ROUTER_URLS.GroupsRouter}/record/:id was hit.`);
    try {
      const groupsController = new GroupsController();
      await groupsController.updateGroup(req, res);
    } catch (error) {
      logger.debug('GroupsRouter', 'POST /', `Encountered an unexpected error: ${error}`);
      res.status(500).json({error: `Encountered an unexpected error: ${error}`});
    }
  }
]);

groupsRouter.put('/', [
  async (req: Request, res: Response, _next: NextFunction) => {
    logger.trace('GroupsRouter', 'PUT', `${SERVER_ROUTER_URLS.GroupsRouter}/ was hit.`);
    try {
      const groupsController = new GroupsController();
      await groupsController.updateAll(req, res);
    } catch (error) {
      logger.debug('GroupsRouter', 'POST /', `Encountered an unexpected error: ${error}`);
      res.status(500).json({error: `Encountered an unexpected error: ${error}`});
    }
  }
]);

groupsRouter.get('/record/:id', [
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    logger.trace('GroupsRouter', 'GET', `${SERVER_ROUTER_URLS.GroupsRouter}/ was hit.`);
    try {
      const groupsController = new GroupsController();
      await groupsController.getGroupById(req, res);
    } catch (err) {
      logger.debug('GroupsRouter', 'GET', `Encountered an unexpected error: ${err}`);
      res.status(500).json({error: `Encountered an unexpected error: ${err}`}); 
    }
  }
]);

groupsRouter.get('/:budgetId', [
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    logger.trace('GroupsRouter', 'GET', `${SERVER_ROUTER_URLS.GroupsRouter}/:budgetId was hit.`);
    try {
      const groupsController = new GroupsController();
      await groupsController.getGroupsByBudgetId(req, res);
    } catch (err) {
      logger.debug('GroupsRouter', 'GET', `Encountered an unexpected error: ${err}`);
      res.status(500).json({error: `Encountered an unexpected error: ${err}`}); 
    }
  }
]);

groupsRouter.delete('/record/:id', [
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    logger.trace('GroupsRouter', 'GET', `${SERVER_ROUTER_URLS.GroupsRouter}/ was hit.`);
    try {
      const groupsController = new GroupsController();
      await groupsController.deleteGroup(req, res);
    } catch (err) {
      logger.debug('GroupsRouter', 'GET', `Encountered an unexpected error: ${err}`);
      res.status(500).json({error: `Encountered an unexpected error: ${err}`}); 
    }
  }
]);

export default groupsRouter;
