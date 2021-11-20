import { IAccount } from '../../../entities/account/account.types';
import { makeUpdateOneAccountValidator } from '../../../validators/schemas/http-requests/account';
import { UpdateOneAccount } from '../../../validators/types/account';
import makeUpdateEntityController from '../../controllers/update-entity';
import { updateAccountUC } from '../../use-cases/update-account';

const updateAccount = makeUpdateEntityController<IAccount, UpdateOneAccount>({
  update: updateAccountUC(),
  requestValidator: makeUpdateOneAccountValidator(),
});

export default updateAccount;
