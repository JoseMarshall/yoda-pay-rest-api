import { config } from 'dotenv';
import { hostname } from 'os';
import path from 'path';

import { logger } from '../utils/logger';
import { MongoHelper } from './external/repositories/mongodb/helpers/mongo-helper';
import { DatabaseHelper } from './external/repositories/repository.types';

const start = async (DbHelper: DatabaseHelper) => {
  try {
    config({
      path: path.resolve(
        process.cwd(),
        `.env.${process.env.TS_NODE_DEV ? 'development' : 'production'}`
      ),
    });

    await DbHelper.connect();

    const { default: app } = await import('./config/app');

    const port = process.env.PORT ?? 4000;
    app.listen(port, () => logger.info(`Server running at ${hostname()}:${port}`));
  } catch (error) {
    logger.error(error);
  }
};

start(MongoHelper).then();

process.on('uncaughtException', err => {
  logger.error(`${new Date().toUTCString()} uncaughtException:`, err.message);
  logger.error(err.stack ?? '');
  process.exit(1);
});
