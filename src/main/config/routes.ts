import { Express, NextFunction, Request, Response } from 'express';

import { ApiErrorsMessage, ApiErrorsName, ApiErrorsType } from '../../constants';
import CustomError from '../../utils/custom-error';
import { makeMsgBody } from '../adapters/express-route-adapter';
import handleInvalidRoute from './handle-invalid-route';

export default async (app: Express): Promise<void> => {
  app.get('/api', (_req: Request, res: Response) =>
    res.status(200).json({
      msg: 'Welcome to Yoda Pay - API',
      date: new Date().toJSON(),
    })
  );

  // /**
  //  * Load all routes from routes folder
  //  */

  // const readdirAsync = promisify(readdir);
  // const routes = await readdirAsync(path.resolve(__dirname, '../../routes'));
  // await Promise.all(
  //   routes.flatMap(route => [
  //     (async r => {
  //       if (!r.includes('__tests__')) {
  //         const router = (await import(`../../routes/${r}`)).default(Router());
  //         app.use(`/api/${r}`, router);
  //       }
  //     })(route),
  //   ])
  // );

  handleInvalidRoute(app);

  /**
   * Global error handler, handles all generic errors
   */
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) =>
    res.status(500).json(
      makeMsgBody(ApiErrorsMessage.InternalError, {
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
