import { Request, Response } from 'express';

import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../constants/errors';
import CustomError from '../../utils/custom-error';
import { Controller } from './adapters.types';

interface MsgBody {
  msg: string;
  payload: unknown;
}

export const makeMsgBody = (msg: string, payload: unknown): MsgBody => ({
  msg,
  payload,
});

export const adaptExpressRoute =
  (controller: Controller) => async (req: Request, res: Response) => {
    try {
      const data = await controller(req, res);
      return res.status(data.status).json(makeMsgBody(data.msg, data.body));
    } catch (error) {
      return error instanceof CustomError
        ? res.status(error.statusCode).json(makeMsgBody(error.message, { error }))
        : res.status(500).json(
            makeMsgBody(ApiMessages.InternalError, {
              error: new CustomError({
                statusCode: 500,
                name: ApiErrorsName.GenericName,
                type: ApiErrorsType.GenericType,
                message: ApiMessages.InternalError,
                stack: error.stack,
                details: error,
              }),
            })
          );
    }
  };

interface InvalidRouteHandlerResponse {
  status: number;
  body: unknown;
  msg: `${ApiMessages}`;
}

export function invalidRouteHandler() {
  return async (req: Request): Promise<InvalidRouteHandlerResponse> => ({
    status: 404,
    body: { method: req.method, url: req.url },
    msg: ApiMessages.RouteNotFound,
  });
}
