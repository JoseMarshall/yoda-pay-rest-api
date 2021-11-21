import { ApiMessages } from '../../../constants';
import { HttpRequest } from '../../adapters/adapters.types';
import { MakeGetAllEntitiesDependencies } from './get-all-entities.types';

function makeGetAllEntitiesController<D, K>({
  findAll,
  requestValidator,
  queryFormatter,
}: MakeGetAllEntitiesDependencies<D, K>) {
  return async (req: HttpRequest) => {
    const validatedQuery = await requestValidator(req);

    const result = await findAll(queryFormatter ? queryFormatter(validatedQuery) : validatedQuery);

    return {
      status: 200,
      body: result.payload,
      msg: ApiMessages.FoundSuccessfully,
    };
  };
}

export default makeGetAllEntitiesController;
