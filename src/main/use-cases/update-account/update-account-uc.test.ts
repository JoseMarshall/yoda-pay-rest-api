import AccountBuilder from '../../../../test-suite/builders/account/account-builder';
import entitiesCollections from '../../../../test-suite/entities-collections';
import { mockCommitChanges, mockRollback } from '../../../../test-suite/global-mocks';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../test-suite/utils';
import updateAccountValidator from '../../../../test-suite/validations/schemas/http-response/account/update-account-validator';
import customErrorValidator from '../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import { CollectionNames } from '../../../constants';
import { AccountModel } from '../../external/repositories/mongodb/models';
import { updateAccountUC } from './index';

const makeSut = () => ({
  sut: updateAccountUC,
});

describe(`${updateAccountUC.name} use-case`, () => {
  const { sut } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(AccountModel, CollectionNames.Accounts);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should update the account phone and address - quering by id', async () => {
    const account = entitiesCollections[CollectionNames.Accounts][0];
    const updatingFields = new AccountBuilder().withAddress().withPhone().build();

    const req = { query: { id: account.id }, body: updatingFields };
    const result = await makeSutRequest(sut(), req);
    const validated = await updateAccountValidator(result.payload);
    expect(validated).toBeDefined();
    expect(result.payload).toMatchObject(updatingFields);
    expect(mockCommitChanges).toHaveBeenCalledTimes(1);
  });

  it('should update the account phone and address - quering by cpf', async () => {
    const account = entitiesCollections[CollectionNames.Accounts][0];
    const updatingFields = new AccountBuilder().withAddress().withPhone().build();

    const req = { query: { cpf: account.cpf }, body: updatingFields };
    const result = await makeSutRequest(sut(), req);
    const validated = await updateAccountValidator(result.payload);

    expect(validated).toBeDefined();
    expect(result.payload).toMatchObject(updatingFields);
    expect(mockCommitChanges).toHaveBeenCalledTimes(1);
  });

  it('should receive a custom error due to not found account', async () => {
    const updatingFields = new AccountBuilder().withAddress().withPhone().build();

    const req = {
      query: { id: 'non-existing id' },
      body: updatingFields,
    };
    try {
      throw await makeSutRequest(sut(), req);
    } catch (error) {
      const validated = await customErrorValidator(error);
      expect(validated).toBeDefined();
      expect(mockRollback).toHaveBeenCalledTimes(1);
    }
  });
});
