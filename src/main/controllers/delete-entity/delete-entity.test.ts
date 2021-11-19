/* eslint-disable no-underscore-dangle */
import { makeSutRequest } from '../../../../test-suite/utils';
import makeDeleteEntityController from '.';

const mockDeleteDependency = jest.fn().mockImplementation(async _ =>
  Promise.resolve({
    payload: {
      disabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  })
);

const mockRequestValidatorDependency = jest
  .fn()
  .mockImplementation(async req => Promise.resolve(req.query));

const makeSut = (
  deleteAll = mockDeleteDependency,
  requestValidator = mockRequestValidatorDependency
) => ({
  sut: makeDeleteEntityController,
  deleteAll,
  requestValidator,
});

describe(`${makeDeleteEntityController.name} Controller`, () => {
  const { sut, deleteAll, requestValidator } = makeSut();

  it('should receive a 200 status code and call the dependency with given data', async () => {
    const req = { query: { id: '1234567890' } };
    const result = await makeSutRequest(sut({ deleteAll, requestValidator }), req);

    expect(result.status).toBe(200);
    expect(result.body.disabled).toBe(true);
    expect(mockRequestValidatorDependency).toHaveBeenCalledWith(req);
    expect(mockDeleteDependency).toHaveBeenCalledWith(req.query);
  });
});
