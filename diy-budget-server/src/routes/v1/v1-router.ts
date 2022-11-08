import userRouter from "./user-router";
import express, { NextFunction } from "express";
import managementRouter from './db-management.router';
import { LoggerService } from '../../services/logger.service';
import recordsRouter from './records.router';

const v0_0_1Router = express.Router();
const logger = LoggerService.getInstance();

v0_0_1Router.get('/', (req, res) => {
  logger.trace('v1router', 'GET /', 'was hit.');
  res.sendStatus(200);
});

v0_0_1Router.use('/users', userRouter);
v0_0_1Router.use('/management', managementRouter);
v0_0_1Router.use('/records', recordsRouter);

export default v0_0_1Router;
