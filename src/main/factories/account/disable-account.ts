import { makeDisableAccountValidator } from '../../../validators/schemas/http-requests/account';
import { AccountIdentifier } from '../../../validators/types/account';
import makeDeleteEntityController from '../../controllers/delete-entity';
import { DeletedEntity } from '../../external/repositories/repository.types';
import { disableAccountUC } from '../../use-cases/disable-account';

const disableAccount = makeDeleteEntityController<DeletedEntity, AccountIdentifier>({
  deleteAll: disableAccountUC(),
  requestValidator: makeDisableAccountValidator(),
});

export default disableAccount;
