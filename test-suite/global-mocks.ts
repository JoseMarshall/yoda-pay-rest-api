import BaseRepository from '../src/main/external/repositories/mongodb/generic-repository';
import { AccountModel } from '../src/main/external/repositories/mongodb/models';

export const mockStartTransaction = jest.fn(async () => ({}));
export const mockRollback = jest.fn(async () => ({}));
export const mockCommitChanges = jest.fn(async () => ({}));

/**
 * Unit Of Work mock, since the transaction mechanism its only supported on replica set, for test environments, the transactions methods should be mocked
 */
jest.mock('../src/main/external/repositories/mongodb/unit-of-work', () => ({
  __esModule: true,
  default: jest.fn(async () => ({
    makeAccountRepository: jest.fn().mockReturnValue(BaseRepository(AccountModel, null)),
    startTransaction: mockStartTransaction,
    rollback: mockRollback,
    commitChanges: mockCommitChanges,
  })),
}));
