import joiValidator from '../../index';
import accountSchema from './account-schema';

const getOneSchema = accountSchema.required().unknown(false);

export default joiValidator(getOneSchema);
