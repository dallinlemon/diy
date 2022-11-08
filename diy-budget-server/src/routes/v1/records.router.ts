import express, { NextFunction } from "express";
import { Request, Response } from "express-serve-static-core";
import { SERVER_ROUTER_URLS } from '../../constants/api.constants';
import RecordsController from '../../controllers/records.controller';
import { LoggerService } from "../../services/logger.service";
import UserService from "../../services/user-service";

const recordsRouter = express.Router();
const logger = LoggerService.getInstance();
recordsRouter.get('/', [
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    logger.trace('RecordsRouter', 'GET', `${SERVER_ROUTER_URLS.RecordsRouter}/ was hit.`);
    try {
      const recordsController = new RecordsController();
      await recordsController.getAllRecords(req, res);
    } catch (err) {
      res.status(500).json({error: `Encountered an unexpected error: ${err}`}); 
    }
  }
]);
  
recordsRouter.post('/', [
  async (req: Request, res: Response, _next: NextFunction) => {
    logger.trace('RecordsRouter', 'POST', `${SERVER_ROUTER_URLS.RecordsRouter}/ was hit.`);
    try {
      // const recordsController = await RecordsController.init();
      const recordsController = new RecordsController();
      await recordsController.createRecord(req, res);
    } catch (error) {
      logger.debug('RecordsRouter', 'POST /', `Encountered an unexpected error: ${error}`);
      res.status(500).json({error: `Encountered an unexpected error: ${error}`});
    }
  }
]);

recordsRouter.put('/:id', [
  async (req: Request, res: Response, _next: NextFunction) => {
    logger.trace('RecordsRouter', 'PUT', `${SERVER_ROUTER_URLS.RecordsRouter}/ was hit.`);
    try {
      // const recordsController = await RecordsController.init();
      const recordsController = new RecordsController();
      await recordsController.updateRecord(req, res);
    } catch (error) {
      logger.debug('RecordsRouter', 'POST /', `Encountered an unexpected error: ${error}`);
      res.status(500).json({error: `Encountered an unexpected error: ${error}`});
    }
  }
]);

recordsRouter.get('/record/:id', [
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    logger.trace('RecordsRouter', 'GET', `${SERVER_ROUTER_URLS.RecordsRouter}/ was hit.`);
    try {
      const recordsController = new RecordsController();
      await recordsController.getRecordById(req, res);
    } catch (err) {
      res.status(500).json({error: `Encountered an unexpected error: ${err}`}); 
    }
  }
]);

recordsRouter.get('/:accountId', [
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    logger.trace('RecordsRouter', 'GET', `${SERVER_ROUTER_URLS.RecordsRouter}/ was hit.`);
    try {
      const recordsController = new RecordsController();
      await recordsController.getRecordsByAccountId(req, res);
    } catch (err) {
      res.status(500).json({error: `Encountered an unexpected error: ${err}`}); 
    }
  }
]);

recordsRouter.delete('/record/:id', [
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    logger.trace('RecordsRouter', 'GET', `${SERVER_ROUTER_URLS.RecordsRouter}/ was hit.`);
    try {
      const recordsController = new RecordsController();
      await recordsController.deleteRecord(req, res);
    } catch (err) {
      res.status(500).json({error: `Encountered an unexpected error: ${err}`}); 
    }
  }
]);

// userRouter.get('/insert', async (req, res, next) => {
//   logger.trace('UserRouter', 'GET /:id/:name', 'was hit.');
//   const userService = await UserService.getInstance();
//   const user = await userService.getById(Number.parseInt(req.body.user));
//   res.status(200).json(user);
// });


export default recordsRouter;
