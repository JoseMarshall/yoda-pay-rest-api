import joi from 'joi';

import joiValidator from '../../index';
import accountSchema from './account-schema';

const getAllSchema = joi
  .object({
    data: joi.array().items(accountSchema).required(),
    count: joi.number().min(0).required(),
  })
  .required()
  .unknown(false);

export default joiValidator(getAllSchema);
