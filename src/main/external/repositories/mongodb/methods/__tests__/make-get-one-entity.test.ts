/* eslint-disable no-underscore-dangle */
import entitiesCollections from '../../../../../../../test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../test-suite/utils';
import getOneAccountValidator from '../../../../../../../test-suite/validations/schemas/http-response/account/get-one-account-validator';
import { CollectionNames } from '../../../../../../constants';
import { AccountModel } from '../../models';
import { makeGetOneEntity } from '../index';

const makeSut = (model = AccountModel) => ({
  sut: makeGetOneEntity,
  model,
});

describe(makeGetOneEntity.name, () => {
  const { sut, model } = makeSut();
  beforeAll(async () => {
    await connect();
    await collectionInit(AccountModel, CollectionNames.Accounts);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should get the entity with this model having the passed ID', async () => {
    const query = { id: entitiesCollections.accounts[0].id };
    const result = await makeSutRequest(sut({ model, options: {} }), query);
    const validated = await getOneAccountValidator(result);

    expect(validated).toBeDefined();
  });

  it('should get the entity with the data formatted', async () => {
    const query = { id: entitiesCollections.accounts[0].id };
    const formatData = data => ({
      ...data,
      newField: 'newValue',
    });

    const result = await makeSutRequest(
      sut({
        model,
        options: {
          formatData,
        },
      }),
      query
    );

    expect(result.newField).toBe('newValue');
  });

  it('should get the entity with specified projection fields', async () => {
    const query = { id: entitiesCollections.accounts[0].id };

    const result = await makeSutRequest(
      sut({
        model,
        options: { projection: { cpf: true } },
      }),
      query
    );

    expect(Object.keys(result).some(key => key !== 'cpf')).toBe(false);
  });

  it('should get an error due to user not found', async () => {
    const query = { id: '1' };
    try {
      await makeSutRequest(sut({ model, options: {} }), query);
      fail('should not reach here');
    } catch (error) {
      expect(true);
    }
  });
});
