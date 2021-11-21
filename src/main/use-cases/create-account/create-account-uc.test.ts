import AccountBuilder from '../../../../test-suite/builders/account/account-builder';
import entitiesCollections from '../../../../test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../test-suite/utils';
import createAccountValidator from '../../../../test-suite/validations/schemas/http-response/account/create-account-validator';
import customErrorValidator from '../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import { CollectionNames } from '../../../constants';
import { AccountModel } from '../../external/repositories/mongodb/models';
import { createAccountUC } from './index';

const makeSut = () => ({
  sut: createAccountUC,
});

describe(`${createAccountUC.name} use-case`, () => {
  const { sut } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(AccountModel, CollectionNames.Accounts);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should create an account', async () => {
    const { id, ...newAccount } = new AccountBuilder().withAll().build();
    const result = await makeSutRequest(sut(), newAccount);
    const validated = await createAccountValidator(result.payload);

    expect(validated).toBeDefined();
    expect(result.payload).toMatchObject(newAccount);
  });

  it('should receive a custom error due to duplicated cpf', async () => {
    const existingAccount = entitiesCollections[CollectionNames.Accounts][0];

    const { id, ...newAccount } = new AccountBuilder()
      .withAll()
      .withCPF(existingAccount.cpf as string)
      .build();

    try {
      throw await makeSutRequest(sut(), newAccount);
    } catch (error) {
      const validated = await customErrorValidator(error);
      expect(validated).toBeDefined();
    }
  });
});
