import joi from 'joi';

import joiValidator from '../../../index';
import { DisableAccount } from '../../../types/account';

const disableAccountSchema = joi
  .object({
    id: joi.string().uuid({ version: 'uuidv4' }),
    cpf: joi.string().max(12),
  })
  .length(1)
  .required()
  .unknown(false);

export default joiValidator<DisableAccount>(disableAccountSchema);
