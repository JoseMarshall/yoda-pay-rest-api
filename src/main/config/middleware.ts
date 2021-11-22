import { Express } from 'express';
import mongoSanitize from 'express-mongo-sanitize';

import { bodyParser, contentType, cors, logger } from '../middleware';

export default (app: Express): void => {
  if (process.env.TS_NODE_DEV) app.use(logger);
  app.use(cors);
  app.use(bodyParser);
  app.use(contentType);
  app.use(mongoSanitize());
};
