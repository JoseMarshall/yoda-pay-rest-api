import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../constants';
import CustomError from '../../../utils/custom-error';
import { AccountIdentifier } from '../../../validators/types/account';
import uow from '../../external/repositories/mongodb/unit-of-work';

// eslint-disable-next-line import/prefer-default-export
export function enableAccountUC() {
  return async (query: AccountIdentifier) => {
    const unitOfWork = await uow();
    try {
      const accountRepo = unitOfWork.makeAccountRepository();
      const enabledAccount = await accountRepo.update(
        { ...query, disabled: true },
        {
          disabled: false,
          disabledAt: null,
        }
      );

      return {
        payload: enabledAccount,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 404,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: ApiMessages.FailureUpdating,
            stack: error.stack,
            details: { ...error, message: ApiMessages.AccountNotFoundEnabledOrDisabled },
          });
    }
  };
}
