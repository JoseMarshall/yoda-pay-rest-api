import joi from 'joi';

import joiValidator from '../../../index';
import { UpdateOneAccount } from '../../../types/account';

const updateOneAccountSchema = joi
  .object({
    query: joi
      .object({
        id: joi.string().uuid({ version: 'uuidv4' }),
        cpf: joi.string().max(12),
      })
      .length(1)
      .required()
      .unknown(false),
    body: joi
      .object({ phone: joi.string().max(15), address: joi.string().max(30) })
      .min(1)
      .required()
      .unknown(false),
  })
  .required()
  .unknown(true);

export default joiValidator<UpdateOneAccount>(updateOneAccountSchema);
