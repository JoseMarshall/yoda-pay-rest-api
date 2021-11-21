import express from 'express';

import setupMiddleware from './middleware';
import setupRoutes from './routes';
import setupSwagger from './swagger';

const app = express();
setupSwagger(app);
setupMiddleware(app);
setupRoutes(app);

export default app;
