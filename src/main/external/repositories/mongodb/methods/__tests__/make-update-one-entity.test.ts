import AccountBuilder from '../../../../../../../test-suite/builders/account/account-builder';
import entitiesCollections from '../../../../../../../test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../test-suite/utils';
import updateAccountValidator from '../../../../../../../test-suite/validations/schemas/http-response/account/update-account-validator';
import { CollectionNames } from '../../../../../../constants';
import { AccountModel } from '../../models';
import { makeUpdateOneEntity } from '../index';

const makeSut = (model = AccountModel) => ({
  sut: makeUpdateOneEntity,
  model,
});

describe(makeUpdateOneEntity.name, () => {
  const { sut, model } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(AccountModel, CollectionNames.Accounts);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should update a entity prop having the passed ID', async () => {
    const { id } = entitiesCollections.accounts[0];
    const body = new AccountBuilder().withName().build();
    const req = { query: { id }, body };
    const result = await makeSutRequest(sut({ model }), req.query, req.body);

    expect(result.name).toBe(req.body.name);
  });

  it('should get an error due to user not found', async () => {
    const req = { query: { id: '1' }, body: { name: 'Mr. John' } };
    try {
      await makeSutRequest(sut({ model }), req.query, req.body);
      fail('Should not reach here');
    } catch (error) {
      expect(true);
    }
  });

  it('should get a duplicate key error due to duplicate prop', async () => {
    const account1 = entitiesCollections.accounts[0];
    const account2 = entitiesCollections.accounts[1];

    const body = new AccountBuilder().withCPF('fake-cpf').build();
    const req1 = { query: { id: account1.id }, body };
    const req2 = { query: { id: account2.id }, body };

    const firstResult = await makeSutRequest(sut({ model }), req1.query, req1.body);
    const userValidatorResult = await updateAccountValidator(firstResult);
    expect(userValidatorResult).toBeDefined();

    try {
      await makeSutRequest(sut({ model }), req2.query, req2.body);
      fail('Should not reach here');
    } catch (error) {
      expect(true);
    }
  });
});
