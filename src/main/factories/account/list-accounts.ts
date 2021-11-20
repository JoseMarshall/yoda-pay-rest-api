import { IAccount } from '../../../entities/account/account.types';
import { makeGetAllAccountsValidator } from '../../../validators/schemas/http-requests/account';
import { GetAllAccounts } from '../../../validators/types/account';
import makeGetAllEntitiesController from '../../controllers/get-all-entities';
import { listAccountsUC } from '../../use-cases/list-accounts';

const listAccounts = makeGetAllEntitiesController<IAccount, GetAllAccounts>({
  findAll: listAccountsUC(),
  requestValidator: makeGetAllAccountsValidator(),
});

export default listAccounts;
