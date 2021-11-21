import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../../constants';
import {
  getResponseBodySchemaRef,
  makeQueryParamSchema,
  paginationParamsArray,
} from '../../builders';
import { customError, joiValidationError } from '../../components';
import { Tags } from '../../enums';

// eslint-disable-next-line import/prefer-default-export
export const listAccounts = {
  get: {
    tags: [Tags.Accounts],
    summary: 'end-point to fetch all accounts',
    parameters: [
      ...paginationParamsArray,
      makeQueryParamSchema({
        name: 'name',
        type: 'string',
        description:
          'Filter the accounts by its owner name. Obs.: Its NOT case sensitive, the result will be those accounts with he owner name that contains the specified value',
        required: false,
        example: 'John',
      }),
      makeQueryParamSchema({
        name: 'sort',
        type: 'string',
        description:
          'The field to sort the accounts by, specify + for ascending and - for descending order. Obs.: The + sign is optional',
        required: false,
        example: '+name,-cpf',
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
