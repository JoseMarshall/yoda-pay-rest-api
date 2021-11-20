import entitiesCollections from '../../../../../../../test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../test-suite/utils';
import disableAccountValidator from '../../../../../../../test-suite/validations/schemas/http-response/account/disable-account-validator';
import { CollectionNames } from '../../../../../../constants';
import { AccountModel } from '../../models';
import { makeDeleteOneEntity } from '../index';

const makeSut = (model = AccountModel) => ({
  sut: makeDeleteOneEntity,
  model,
});

describe('deleteOneEntity dependencies', () => {
  const { sut, model } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(AccountModel, CollectionNames.Accounts);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should delete the entity having the passed ID', async () => {
    const query = { id: entitiesCollections.accounts[0].id };
    const result = await makeSutRequest(sut({ model }), query);
    const validated = await disableAccountValidator(result);

    expect(validated).toBeDefined();
  });

  it('should delete the entity having the passed CPF', async () => {
    const query = { cpf: entitiesCollections.accounts[0].cpf };
    await model.updateOne(query, { disabled: false });
    const result = await makeSutRequest(sut({ model }), query);
    const validated = await disableAccountValidator(result);

    expect(validated).toBeDefined();
  });

  it('should get an error due to entity not found', async () => {
    const query = { id: '1' };
    try {
      await makeSutRequest(sut({ model }), query);
      fail('should not reach here');
    } catch (error) {
      expect(true);
    }
  });
});
