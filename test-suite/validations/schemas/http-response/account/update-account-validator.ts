import joiValidator from '../../index';
import accountSchema from './account-schema';

const updateSchema = accountSchema.required().unknown(true);

export default joiValidator(updateSchema);
