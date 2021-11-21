import { Express, NextFunction, Request, Response } from 'express';

import { ApiMessages, ApiErrorsName, ApiErrorsType } from '../../constants';
import { RoutesPaths } from '../../constants/server';
import CustomError from '../../utils/custom-error';
import { makeMsgBody } from '../adapters/express-route-adapter';
import accountRoutes from '../routes/accounts';
import handleInvalidRoute from './handle-invalid-route';

export default async (app: Express): Promise<void> => {
  app.use(RoutesPaths.Accounts, accountRoutes);

  handleInvalidRoute(app);

  /**
   * Global error handler, handles all generic errors
   */
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) =>
    res.status(500).json(
      makeMsgBody(ApiMessages.InternalError, {
        error: new CustomError({
          statusCode: 500,
          name: ApiErrorsName.GenericName,
          type: ApiErrorsType.GenericType,
          message: err.message,
          stack: err.stack ?? '',
          details: { ...err },
        }),
      })
    )
  );
};
