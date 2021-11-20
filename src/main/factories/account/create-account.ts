import { IAccount, IAccountInput } from '../../../entities/account/account.types';
import { makeCreateAccountsValidator } from '../../../validators/schemas/http-requests/account';
import makeCreateEntityController from '../../controllers/create-entity';
import { createAccountUC } from '../../use-cases/create-account';

const createAccount = makeCreateEntityController<IAccount, IAccountInput>({
  create: createAccountUC(),
  requestValidator: makeCreateAccountsValidator(),
});

export default createAccount;
