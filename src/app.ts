import './db/db';

import express from 'express';

import authMiddleware from './middleware/auth';
import taskRouter from './routers/taskRouter';
import userRouter from './routers/userRouter';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/task', authMiddleware, taskRouter);
// TODO: need a patch to catch 404 error
// TODO: need helmet package for security on PROD
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
