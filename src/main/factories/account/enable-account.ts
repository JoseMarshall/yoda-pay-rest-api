import { IAccount } from '../../../entities/account/account.types';
import { makeEnableAccountValidator } from '../../../validators/schemas/http-requests/account';
import { AccountIdentifier } from '../../../validators/types/account';
import makeUpdateEntityController from '../../controllers/update-entity';
import { enableAccountUC } from '../../use-cases/enable-account';

const enableAccount = makeUpdateEntityController<IAccount, AccountIdentifier>({
  update: enableAccountUC(),
  requestValidator: makeEnableAccountValidator(),
});

export default enableAccount;
