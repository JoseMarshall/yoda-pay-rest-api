import entitiesCollections from '../../../../test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../test-suite/utils';
import disableAccountValidator from '../../../../test-suite/validations/schemas/http-response/account/disable-account-validator';
import customErrorValidator from '../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import { CollectionNames } from '../../../constants';
import { AccountModel } from '../../external/repositories/mongodb/models';
import { disableAccountUC } from './index';

const makeSut = () => ({
  sut: disableAccountUC,
});

describe(`${disableAccountUC.name} use-case`, () => {
  const { sut } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(AccountModel, CollectionNames.Accounts);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should disable the account associated to the passed id', async () => {
    const account = entitiesCollections[CollectionNames.Accounts][0];

    const query = { id: account.id };
    const result = await makeSutRequest(sut(), query);
    const validated = await disableAccountValidator(result.payload);

    expect(validated).toBeDefined();
  });

  it('should disable the account associated to the passed cpf', async () => {
    const account = entitiesCollections[CollectionNames.Accounts][1];

    const query = { cpf: account.cpf };
    const result = await makeSutRequest(sut(), query);
    const validated = await disableAccountValidator(result.payload);

    expect(validated).toBeDefined();
  });

  it('should receive a custom error due to not found account or already disabled', async () => {
    const account = entitiesCollections[CollectionNames.Accounts][0];
    await AccountModel.updateOne({ id: account.id }, { disabled: true, disabledAt: new Date() });

    const query = {
      id: account.id,
    };
    try {
      throw await makeSutRequest(sut(), query);
    } catch (error) {
      const validated = await customErrorValidator(error);
      expect(validated).toBeDefined();
    }
  });
});
