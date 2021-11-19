import { v4 as uuid } from 'uuid';

import enableAccountSchema from '../enable-account-schema';

const makeSut = () => ({ sut: enableAccountSchema });

describe(enableAccountSchema.name, () => {
  it('returns the query, means its success - ID', async () => {
    const { sut } = makeSut();
    const query = {
      id: uuid(),
    };
    const result = await sut(query);
    expect(result).toEqual(query);
  });

  it('returns the query, means its success - CPF', async () => {
    const { sut } = makeSut();
    const query = {
      cpf: '1234',
    };
    const result = await sut(query);
    expect(result).toEqual(query);
  });

  it('throws an error if no query is passed', async () => {
    const { sut } = makeSut();
    return expect(sut({})).rejects.toBeDefined();
  });

  it('throws an error if unknown key is passed', async () => {
    const { sut } = makeSut();
    const query = {
      unknownKey: 'any_value',
    };
    return expect(sut(query)).rejects.toBeDefined();
  });

  it('throws an error if more than one key is passed', async () => {
    const { sut } = makeSut();
    const query = {
      id: uuid(),
      cpf: '1234',
    };
    return expect(sut(query)).rejects.toBeDefined();
  });
});
