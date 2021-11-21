import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../../constants';
import {
  getRequestBodySchemaRef,
  getResponseBodySchemaRef,
  makeQueryParamSchema,
} from '../../builders';
import { customError } from '../../components';
import { Tags } from '../../enums';
import { customErrorSchema } from '../../schemas/errors';

// eslint-disable-next-line import/prefer-default-export
export const updateAccount = {
  patch: {
    tags: [Tags.Accounts],
    summary: 'end-point to update an account',
    parameters: [
      makeQueryParamSchema({
        name: 'id',
        type: 'string',
        description: 'The unique identifier of this account in database',
        example: 'f37226ad-f294-49b6-ac6d-5fd18995220a',
        required: false,
      }),
      makeQueryParamSchema({
        name: 'cpf',
        type: 'string',
        description: 'The cpf associated to this account',
        example: '5fd18995220a',
        required: false,
      }),
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: getRequestBodySchemaRef('updateAccount'),
        },
      },
    },
    responses: {
      200: {
        description: ApiMessages.UpdatedSuccessfully,
        content: {
          'application/json': {
            schema: getResponseBodySchemaRef('updateAccount'),
          },
        },
      },
      422: customError(
        {
          description: ApiMessages.FailureUpdating,
          name: ApiErrorsName.ResourceNotFound,
          type: ApiErrorsType.GenericType,
          code: 422,
        },
        [
          customErrorSchema({
            description: ApiMessages.NoMatchedSchema,
            name: ApiErrorsName.NoMatchedSchema,
            type: ApiErrorsType.ValidationError,
            code: 422,
          }),
          customErrorSchema({
            description: ApiMessages.DuplicatedValue,
            name: ApiErrorsName.DuplicatedValue,
            type: ApiErrorsType.ValidationError,
            code: 422,
          }),
        ]
      ),
      500: customError({ description: ApiMessages.InternalError }),
    },
  },
};
