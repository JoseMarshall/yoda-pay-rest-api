import { RoutesPaths } from '../../constants/server';
import { Tags } from './enums';
import {
  createAccount,
  disableAccount,
  enableAccount,
  listAccounts,
  updateAccount,
} from './paths/account';
import {
  createAccountRequestBodySchema,
  updateAccountRequestBodySchema,
} from './schemas/request-body';
import {
  createAccountResponseBodySchema,
  disableAccountResponseBodySchema,
  enableAccountResponseBodySchema,
  listAccountsResponseBodySchema,
  updateAccountResponseBodySchema,
} from './schemas/response-body';

export default {
  openapi: '3.0.1',
  info: {
    title: 'Yoda-Pay',
    description: 'CRUD Account, last updated at 2021-11-20 08:10 by JoseM@rshall PD',
    version: '1.0.0',
  },
  servers: [{ url: '/' }],
  tags: [
    {
      name: Tags.Accounts,
    },
  ],

  paths: {
    [`${RoutesPaths.Accounts}`]: { ...listAccounts, ...createAccount, ...updateAccount },
    [`${RoutesPaths.Accounts}/enable`]: enableAccount,
    [`${RoutesPaths.Accounts}/disable`]: disableAccount,
  },

  schemas: {
    requestBody: {
      updateAccount: updateAccountRequestBodySchema,
      createAccount: createAccountRequestBodySchema,
    },
    responseBody: {
      createAccount: createAccountResponseBodySchema,
      updateAccount: updateAccountResponseBodySchema,
      disableAccount: disableAccountResponseBodySchema,
      enableAccount: enableAccountResponseBodySchema,
      listAccounts: listAccountsResponseBodySchema,
    },
  },
};
