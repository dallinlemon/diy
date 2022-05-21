import userRouter from "./user-router";
import express, { NextFunction } from "express";

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
    console.log('Request hit baseRouter: .get /');
    // getEmployee();

    res.sendStatus(200);
});

v1Router.use('/users', userRouter);

export default v1Router;
