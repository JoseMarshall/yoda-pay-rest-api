import joiValidator from '../../index';
import accountSchema from './account-schema';

const enableAccountSchema = accountSchema.required().unknown(false);

export default joiValidator(enableAccountSchema);
