import { ObjectSchema, ValidationError } from 'joi';

import { ApiErrorsMessage, ApiErrorsName, ApiErrorsType } from '../constants';
import CustomError from '../utils/custom-error';

function JoiValidator<T>(schema: ObjectSchema) {
  return async (payload: unknown): Promise<T> => {
    try {
      return (await schema.validateAsync(payload)) as Promise<T>;
    } catch (error) {
      throw (error as ValidationError).isJoi
        ? new CustomError({
            details: { validationDetails: error.details, isJoi: true },
            statusCode: 422,
            stack: '',
            type: ApiErrorsType.ValidationError,
            name: ApiErrorsName.NoMatchedSchema,
            message: ApiErrorsMessage.NoMatchedSchema,
          })
        : new CustomError({
            details: error,
            statusCode: 500,
            stack: error.stack,
            type: ApiErrorsType.InternalError,
            name: ApiErrorsName.GenericName,
            message: ApiErrorsMessage.InternalError,
          });
    }
  };
}

export default JoiValidator;
