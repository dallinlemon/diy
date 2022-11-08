import express from "express";
import { LoggerService } from "../../services/logger.service";
import UserService from "../../services/user-service";

const userRouter = express.Router();
const logger = LoggerService.getInstance();

userRouter.get('/', async (req, res, next) => {
  logger.trace('UserRouter', 'GET /', 'was hit.');
  const userService = await UserService.getInstance();
  const users = await userService.getAll();
  res.status(200).json(users);
});

userRouter.post('/', async (req, res, next) => {
  logger.trace('UserRouter', 'POST /', 'was hit.');
  try {
    // TODO verify request body
    // TODO verify user is admin
    // TODO add a controller layer
    const userService = await UserService.getInstance();
    const user = await userService.insert(req.body);
    if (user) {
      res.status(201).json({created: user});
    } else {
      throw new Error('User was not created.');
    }
  } catch (error) {
    logger.debug('UserRouter', 'POST /', `${error}`);
    res.status(500).json(error);
  }
});

userRouter.get('/:id', async (req, res, next) => {
  logger.trace('UserRouter', 'GET /:id', 'was hit.');
  const userService = await UserService.getInstance();
  const user = await userService.getById(Number.parseInt(req.params.id));
  res.status(200).json(user);
});

userRouter.get('/insert', async (req, res, next) => {
  logger.trace('UserRouter', 'GET /:id/:name', 'was hit.');
  const userService = await UserService.getInstance();
  const user = await userService.getById(Number.parseInt(req.body.user));
  res.status(200).json(user);
});


export default userRouter;
