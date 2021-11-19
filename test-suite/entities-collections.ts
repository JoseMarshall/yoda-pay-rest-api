import { CollectionNames } from '../src/constants';
import accounts from './collections/accounts-collection';

interface CollectionElement {
  id: string;
  [x: string]: unknown;
  createdAt: Date;
  updatedAt: Date;
}

export default {
  [CollectionNames.Accounts]: accounts,
} as Record<`${CollectionNames}`, ReadonlyArray<CollectionElement>>;
