import express from "express";
import { LoggerService } from "../../services/logger.service";
import UserService from "../../services/user-service";

const userRouter = express.Router();
const logger = LoggerService.getInstance();

userRouter.get('/', async (req, res, next) => {
  logger.trace('UserRouter', 'GET /', 'was hit.');
  const userService = await UserService.getInstance();
  const users = await userService.getAll();
  res.json(users);
});

userRouter.get('/:id', async (req, res, next) => {
  logger.trace('UserRouter', 'GET /:id', 'was hit.');
  const userService = await UserService.getInstance();
  const user = await userService.getById(Number.parseInt(req.params.id));
  res.json(user);
});

userRouter.get('/insert', async (req, res, next) => {
  logger.trace('UserRouter', 'GET /:id/:name', 'was hit.');
  const userService = await UserService.getInstance();
  const user = await userService.getById(Number.parseInt(req.body.user));
  res.json(user);
});

export default userRouter;
