import express from 'express';
import { createServer } from 'http';

import setupMiddleware from './middleware';
import setupRoutes from './routes';

const app = express();
setupMiddleware(app);
setupRoutes(app);

export default app;
