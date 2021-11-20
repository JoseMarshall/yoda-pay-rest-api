import { ApiErrorsMessage, ApiErrorsName, ApiErrorsType } from '../../../constants';
import { makeAccount } from '../../../entities/account';
import { IAccountInput } from '../../../entities/account/account.types';
import CustomError from '../../../utils/custom-error';
import uow from '../../external/repositories/mongodb/unit-of-work';

// eslint-disable-next-line import/prefer-default-export
export function createAccountUC() {
  return async (data: IAccountInput) => {
    const unitOfWork = await uow();
    try {
      const accountRepo = unitOfWork.makeAccountRepository();
      const createdAccount = await accountRepo.add(makeAccount(data));

      return {
        payload: createdAccount,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 422,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: ApiErrorsMessage.FailureCreating,
            stack: error.stack,
            details: error,
          });
    }
  };
}
