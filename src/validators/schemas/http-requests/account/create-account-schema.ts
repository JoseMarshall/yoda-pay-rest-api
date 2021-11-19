import joi from 'joi';

import { IAccountInput } from '../../../../entities/account/account.types';
import joiValidator from '../../../index';

const createAccountSchema = joi
  .object({
    name: joi.string().min(2).max(50).required(),
    cpf: joi.string().max(12).required(),
    phone: joi.string().max(15).required(),
    address: joi.string().max(30).required(),
  })
  .required()
  .unknown(false);

export default joiValidator<IAccountInput>(createAccountSchema);
