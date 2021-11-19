import { ApiErrorsMessage } from '../../../constants';
import { HttpRequest } from '../../adapters/adapters.types';
import { MakeDeleteEntityDependencies } from './delete-entity.types';

function makeDeleteEntityController<D, K>({
  deleteAll,
  requestValidator,
}: MakeDeleteEntityDependencies<D, K>) {
  return async (req: HttpRequest) => {
    const validatedReq = await requestValidator(req);

    const result = await deleteAll(validatedReq);

    return {
      status: 200,
      body: result.payload,
      msg: ApiErrorsMessage.DeletedSuccessfully,
    };
  };
}

export default makeDeleteEntityController;
