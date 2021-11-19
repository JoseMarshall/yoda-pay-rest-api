import joi from 'joi';

import joiValidator from '../../../index';
import { GetAllAccounts } from '../../../types/account';
import { getAllSchema } from '../sub-schemas';

const getAllAccountsSchema = joi
  .object(getAllSchema)
  .append({
    name: joi.string().min(1).max(50),
  })
  .required()
  .unknown(false);

export default joiValidator<GetAllAccounts>(getAllAccountsSchema);
