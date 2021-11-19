import { ApiErrorsMessage } from '../../../constants';
import { HttpRequest } from '../../adapters/adapters.types';
import { MakeUpdateEntityDependencies } from './update-entity.types';

function makeUpdateEntityController<D, K>({
  update,
  requestValidator,
}: MakeUpdateEntityDependencies<D, K>) {
  return async (req: HttpRequest) => {
    const validatedReq = await requestValidator(req);
    const result = await update(validatedReq);

    return {
      status: 201,
      body: result.payload,
      msg: ApiErrorsMessage.UpdatedSuccessfully,
    };
  };
}

export default makeUpdateEntityController;
