import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../../constants';
import { getResponseBodySchemaRef, makeQueryParamSchema } from '../../builders';
import { customError, joiValidationError } from '../../components';
import { Tags } from '../../enums';

// eslint-disable-next-line import/prefer-default-export
export const disableAccount = {
  patch: {
    tags: [Tags.Accounts],
    summary: 'end-point to disable an account',
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
    responses: {
      200: {
        description: ApiMessages.DisabledSuccessfully,
        content: {
          'application/json': {
            schema: getResponseBodySchemaRef('disableAccount'),
          },
        },
      },
      404: customError({
        description: ApiMessages.AccountNotFoundEnabledOrDisabled,
        name: ApiErrorsName.GenericName,
        type: ApiErrorsType.GenericType,
        code: 404,
      }),
      422: joiValidationError(),
      500: customError({ description: ApiMessages.InternalError }),
    },
  },
};
