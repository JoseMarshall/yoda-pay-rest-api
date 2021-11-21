import { ApiMessages } from '../../../constants';
import { HttpRequest } from '../../adapters/adapters.types';
import { MakeCreateOneEntityDependencies } from './create-entity.types';

function makeCreateOneEntityController<D, K>({
  create,
  requestValidator,
}: MakeCreateOneEntityDependencies<D, K>) {
  return async (req: HttpRequest) => {
    const validatedBody = await requestValidator(req);
    const result = await create(validatedBody);

    return {
      status: 201,
      body: result.payload,
      msg: ApiMessages.CreatedSuccessfully,
    };
  };
}

export default makeCreateOneEntityController;
