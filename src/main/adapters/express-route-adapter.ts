import { Request, Response } from 'express';

import { ApiErrorsMessage, ApiErrorsName, ApiErrorsType } from '../../constants/errors';
import CustomError from '../../utils/custom-error';
import { Controller } from './adapters.types';

export const makeMsgBody = (msg: string, payload: Record<string, any>) => ({ msg, payload });

export const adaptExpressRoute =
  (controller: Controller) => async (req: Request, res: Response) => {
    try {
      const data = await controller(req, res);
      return res.status(data.status).json(makeMsgBody(data.msg, data.body));
    } catch (error) {
      return error instanceof CustomError
        ? res.status(error.statusCode).json(makeMsgBody(error.message, { error }))
        : res.status(500).json(
            makeMsgBody(ApiErrorsMessage.InternalError, {
              error: new CustomError({
                statusCode: 500,
                name: ApiErrorsName.GenericName,
                type: ApiErrorsType.GenericType,
                message: ApiErrorsMessage.InternalError,
                stack: error.stack,
                details: error,
              }),
            })
          );
    }
  };

export function invalidRouteHandler() {
  return async (req: Request) => ({
    status: 404,
    body: { method: req.method, url: req.url },
    msg: ApiErrorsMessage.RouteNotFound,
  });
}
