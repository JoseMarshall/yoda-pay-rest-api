import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../constants';
import { IAccount } from '../../../entities/account/account.types';
import CustomError from '../../../utils/custom-error';
import { GetAllAccounts } from '../../../validators/types/account';
import { formatQueryToRegex } from '../../external/repositories/mongodb/helpers';
import { MakeGetAllEntitiesDependencies } from '../../external/repositories/mongodb/mongoose.types';
import uow from '../../external/repositories/mongodb/unit-of-work';

// eslint-disable-next-line import/prefer-default-export
export function listAccountsUC() {
  return async (query: GetAllAccounts) => {
    const unitOfWork = await uow();
    try {
      const accountRepo = unitOfWork.makeAccountRepository();
      const accountsList = await accountRepo.getAll<MakeGetAllEntitiesDependencies<IAccount>>(
        query,
        {
          formatQuery: formatQueryToRegex,
        }
      );

      return {
        payload: accountsList,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 400,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: ApiMessages.RequestProcessedError,
            stack: error.stack,
            details: error,
          });
    }
  };
}
