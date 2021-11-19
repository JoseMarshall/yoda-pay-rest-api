import joi from 'joi';

import joiValidator from '../../index';
import accountSchema from './account-schema';

const createSchema = accountSchema
  .append({ disabled: joi.boolean().valid(false).required() })
  .required()
  .unknown(true);

export default joiValidator(createSchema);
