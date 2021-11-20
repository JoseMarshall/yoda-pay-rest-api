import { ApiErrorsMessage, ApiErrorsName, ApiErrorsType } from '../../../constants';
import CustomError from '../../../utils/custom-error';
import { UpdateOneAccount } from '../../../validators/types/account';
import uow from '../../external/repositories/mongodb/unit-of-work';

// eslint-disable-next-line import/prefer-default-export
export function updateAccountUC() {
  return async ({ body, query }: UpdateOneAccount) => {
    const unitOfWork = await uow();
    try {
      await unitOfWork.startTransaction();

      const accountRepo = unitOfWork.makeAccountRepository();
      const updatedAccount = await accountRepo.update(query, body);

      await unitOfWork.commitChanges();

      return {
        payload: updatedAccount,
      };
    } catch (error) {
      await unitOfWork.rollback();

      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 422,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: ApiErrorsMessage.FailureUpdating,
            stack: error.stack,
            details: { ...error, message: ApiErrorsMessage.AccountNotFoundEnabledOrDisabled },
          });
    }
  };
}
