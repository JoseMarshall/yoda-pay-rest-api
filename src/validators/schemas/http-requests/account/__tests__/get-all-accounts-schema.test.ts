import faker from 'faker';

import getAllAccountsSchema from '../get-all-accounts-schema';

const makeSut = () => ({ sut: getAllAccountsSchema });

describe(getAllAccountsSchema.name, () => {
  it('returns the query, means its success ', async () => {
    const { sut } = makeSut();
    const query = {
      page: '1',
      limit: '10',
      name: faker.name.findName(),
    };

    const result = await sut(query);
    expect(result).toEqual(query);
  });

  it('throws an error if no query is passed', async () => {
    const { sut } = makeSut();
    try {
      await sut({});
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });

  it('throws an error if at least one field is not valid - name cannot be empty', async () => {
    const { sut } = makeSut();
    const query = {
      page: '1',
      name: '',
    };

    try {
      await sut(query);
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });

  it('throws an error if unknown keys passed', async () => {
    const { sut } = makeSut();
    const query = {
      page: '1',
      name: faker.name.findName(),
    };

    try {
      await sut({ ...query, anyOtherKey: 'foo' });
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });
});
