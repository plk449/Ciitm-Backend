import express from 'express';
const app = express();

import { AdminVerify, StudentVerify } from './Login_middleware.js';

import indexRouter from '../routes/index.js';
import studentRouter from '../routes/student.js';
import adminRouter from '../routes/admin.js';

app.use('/api', indexRouter);
app.use('/api/admin', AdminVerify, adminRouter);
app.use('/api/student', StudentVerify, studentRouter);

export default app;
