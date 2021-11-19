import { HttpRequest } from '../../../../main/adapters/adapters.types';
import createAccountsSchemaValidator from './create-account-schema';
import disableAccountSchemaValidator from './disable-account-schema';
import enableAccountSchemaValidator from './enable-account-schema';
import getAllAccountsSchemaValidator from './get-all-accounts-schema';
import updateOneAccountsSchemaValidator from './update-one-account-schema';

// eslint-disable-next-line import/prefer-default-export
export const makeCreateAccountsValidator = () => async (req: HttpRequest) =>
  createAccountsSchemaValidator(req.body);

export const makeUpdateOneAccountValidator = () => async (req: HttpRequest) =>
  updateOneAccountsSchemaValidator(req);

export const makeGetAllAccountsValidator = () => async (req: HttpRequest) =>
  getAllAccountsSchemaValidator(req.query);

export const makeEnableAccountValidator = () => async (req: HttpRequest) =>
  enableAccountSchemaValidator(req.query);

export const makeDisableAccountValidator = () => async (req: HttpRequest) =>
  disableAccountSchemaValidator(req.query);
