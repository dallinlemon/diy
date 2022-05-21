import express, { Request, Response, NextFunction } from 'express';
import v1Router from './routes/v1/v1-router';

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

app.use('/v1', v1Router);

app.get('test/', (req: Request, res: Response, next: NextFunction) => {
    console.log('hit test');
    res.sendStatus(200);
});
