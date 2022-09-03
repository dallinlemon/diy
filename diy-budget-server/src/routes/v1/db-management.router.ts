import express from "express";
import ManagementDao from '../../dao/management.dao';
import { LoggerService } from "../../services/logger.service";

const managementRouter = express.Router();
const logger = LoggerService.getInstance();

managementRouter.get('/', async (req, res, next) => {
  logger.trace('managementRouter', `GET ${req.url}`, 'was hit.');
  logger.debug('managementRouter', `Get ${req.url}`, `req.url: ${req.url}, req.url: ${req.url}, req.url: ${req.url}`);
  res.status(200);
});

managementRouter.post('/database/backup', async (req, res, next) => {
  logger.trace('managementRouter', `POST ${req.url}`, 'was hit.');
  try {
    //TODO add controller and service to manage database
    const managementDao = await ManagementDao.getInstance();
    await managementDao.backupDB();
    res.sendStatus(200);
  } catch (error) {
    logger.debug('managementRouter', `POST ${req.url}`, `Error: ${error.message}`);
    res.sendStatus(500);
  }
});


export default managementRouter;
