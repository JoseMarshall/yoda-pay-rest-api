import { ObjectSchema, ValidationError } from 'joi';

import { ApiErrorsMessage, ApiErrorsName, ApiErrorsType } from '../../../src/constants';
import CustomError from '../../../src/utils/custom-error';

function JoiValidator<T>(schema: ObjectSchema) {
  return async (payload: unknown): Promise<T> => {
    try {
      return (await schema.validateAsync(payload)) as Promise<T>;
    } catch (error) {
      throw (error as ValidationError).isJoi
        ? new CustomError({
            details: error,
            statusCode: 422,
            stack: '',
            type: ApiErrorsType.ValidationError,
            name: ApiErrorsName.NoMatchedSchema,
            message: ApiErrorsMessage.RequestProcessedError,
          })
        : error;
    }
  };
}

export default JoiValidator;
