import joi from 'joi';

import joiValidator from '../../index';

const deleteSchema = joi
  .object({
    id: joi.string().uuid({ version: 'uuidv4' }),
    _id: joi.string().uuid({ version: 'uuidv4' }),
    disabled: joi.boolean().valid(true),
    disabledAt: joi.date(),
    createdAt: joi.date().required(),
    updatedAt: joi.date().required(),
  })
  .required()
  .unknown(false);

export default joiValidator(deleteSchema);
