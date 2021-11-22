import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../../constants';
import {
  getResponseBodySchemaRef,
  makeGetAllParameters,
  makeQueryParamSchema,
} from '../../builders';
import { customError, joiValidationError } from '../../components';
import { Tags } from '../../enums';

// eslint-disable-next-line import/prefer-default-export
export const listAccounts = {
  get: {
    tags: [Tags.Accounts],
    summary: 'end-point to fetch all accounts',
    parameters: [
      ...makeGetAllParameters(),
      makeQueryParamSchema({
        name: 'name',
        type: 'string',
        description:
          'Filter the accounts by its owner name. Obs.: Its NOT case sensitive, the result will be those accounts with he owner name that contains the specified value',
        required: false,
        example: 'John',
      }),
    ],
    responses: {
      200: {
        description: ApiMessages.FoundSuccessfully,
        content: {
          'application/json': {
            schema: getResponseBodySchemaRef('listAccounts'),
          },
        },
      },
      400: customError({
        description: ApiMessages.RequestProcessedError,
        name: ApiErrorsName.GenericName,
        type: ApiErrorsType.GenericType,
        code: 400,
      }),
      422: joiValidationError(),
      500: customError({ description: ApiMessages.InternalError }),
    },
  },
};
