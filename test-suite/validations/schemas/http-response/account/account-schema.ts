import joi from 'joi';

import joiValidator from '../../index';

export default joi.object({
  id: joi.string().uuid({ version: 'uuidv4' }).required(),
  _id: joi.string().uuid({ version: 'uuidv4' }),
  name: joi.string().required(),
  cpf: joi.string().required(),
  phone: joi.string().required(),
  address: joi.string().required(),
  disabled: joi.boolean(),
  disabledAt: joi.date(),
  createdAt: joi.date().required(),
  updatedAt: joi.date().required(),
});
