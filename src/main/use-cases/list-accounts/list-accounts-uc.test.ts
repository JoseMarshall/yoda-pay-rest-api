import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../test-suite/utils';
import getAllAccountsValidator from '../../../../test-suite/validations/schemas/http-response/account/get-all-accounts-validator';
import { CollectionNames } from '../../../constants';
import { AccountModel } from '../../external/repositories/mongodb/models';
import { listAccountsUC } from './index';

const makeSut = () => ({
  sut: listAccountsUC,
});

describe(`${listAccountsUC.name} use-case`, () => {
  const { sut } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(AccountModel, CollectionNames.Accounts);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should receive accounts object which obey the getAllAccountsValidator', async () => {
    const result = await makeSutRequest(sut(), { page: 1, limit: 3 });
    const validated = await getAllAccountsValidator(result.payload);
    expect(validated).toBeDefined();
  });
});
