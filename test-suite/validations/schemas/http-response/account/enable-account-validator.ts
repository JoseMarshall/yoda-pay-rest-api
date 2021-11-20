import joi from 'joi';

import joiValidator from '../../index';
import accountSchema from './account-schema';

const enableAccountSchema = accountSchema
  .append({ disabled: joi.boolean().valid(false), disabledAt: joi.valid(null) })
  .required()
  .unknown(false);

export default joiValidator(enableAccountSchema);
