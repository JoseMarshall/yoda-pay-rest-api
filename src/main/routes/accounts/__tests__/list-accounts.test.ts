import {
  apiRequest,
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
} from '../../../../../test-suite/utils';
import getAllAccountsValidator from '../../../../../test-suite/validations/schemas/http-response/account/get-all-accounts-validator';
import { MsgBodyErrorValidator } from '../../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import { CollectionNames } from '../../../../constants';
import { RoutesPaths } from '../../../../constants/server';
import { AccountModel } from '../../../external/repositories/mongodb/models';

describe(`Method GET ${RoutesPaths.Accounts} should list accounts`, () => {
  beforeAll(async () => {
    await connect();
    await collectionInit(AccountModel, CollectionNames.Accounts);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should return a 200 code response', async () => {
    const response = await apiRequest
      .get(RoutesPaths.Accounts)
      .query({ page: '1', limit: '3' })
      .send();
    const validated = await getAllAccountsValidator(response.body.payload);
    expect(response.status).toBe(200);
    expect(validated).toBeDefined();
  });

  it('should return a 422 since page is not valid', async () => {
    const response = await apiRequest
      .get(RoutesPaths.Accounts)
      .query({ page: 'abc', limit: '3' })
      .send();
    const validated = await MsgBodyErrorValidator(response.body);

    expect(response.status).toBe(422);
    expect(validated).toBeDefined();
  });
});
