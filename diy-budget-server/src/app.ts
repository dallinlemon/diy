import express, { Request, Response, NextFunction } from 'express';
import v0_0_1Router from './routes/v1/v1-router';

export const app = express();
const port = 3000;
app.use(express.json());
// app.use(expressSession({
//     secret: 'whatever-probably-should-be-from-env-vars',
//     cookie: {},
//   }));

app.listen(port, () => {
  console.log(`application is running on port ${port}.`);
});

app.use('/v0.0.1', v0_0_1Router);

app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    console.log('hit test');
    res.sendStatus(200);
});
