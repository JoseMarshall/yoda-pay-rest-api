import { CollectionNames } from '../src/constants';
import accounts from './collections/accounts-collection';

export default {
  [CollectionNames.Accounts]: accounts,
} as Record<`${CollectionNames}`, any>;
