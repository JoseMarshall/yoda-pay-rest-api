import joi from 'joi';

import joiValidator from '../../../index';
import { AccountIdentifier } from '../../../types/account';

const enableAccountSchema = joi
  .object({
    id: joi.string().uuid({ version: 'uuidv4' }),
    cpf: joi.string().max(12),
  })
  .length(1)
  .required()
  .unknown(false);

export default joiValidator<AccountIdentifier>(enableAccountSchema);
