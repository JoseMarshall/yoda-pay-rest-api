import { Document } from 'mongoose';

import { safeParseInt } from '../../../../../utils/data-parsers';
import { QueryGetAll } from '../../repository.types';
import { makeSortQuery, queryGuard } from '../helpers';
import { GetAllEntitiesAggregatedData, MakeGetAllEntityData } from '../mongoose.types';

// eslint-disable-next-line import/prefer-default-export
export function makeGetAllEntities<D extends Document, K>({
  model,
  options,
}: MakeGetAllEntityData<D, K>) {
  return async (query: QueryGetAll & Record<string, unknown>) => {
    const { page, limit, sort, ...filteredQuery } = query;
    const pageNumber = safeParseInt(page, 10);
    const docPerPage = safeParseInt(limit ?? '0', 10);
    const skip = docPerPage > 0 ? docPerPage * (pageNumber - 1) : 0;

    const formattedQuery = options.formatQuery ? options.formatQuery(filteredQuery) : filteredQuery;

    const document = await queryGuard<GetAllEntitiesAggregatedData<D>[]>(
      model
        .aggregate([
          {
            $facet: {
              data: [
                {
                  $match: { disabled: false, ...formattedQuery },
                },
                { $sort: makeSortQuery(sort) },
                { $skip: skip },
                { $limit: docPerPage || 15 },
                {
                  $project: {
                    _id: 0,
                    ...(options.projection ?? {}),
                  },
                },
              ],
              count: [
                {
                  $match: { disabled: false, ...formattedQuery },
                },
                { $count: 'total' },
              ],
            },
          },
        ])
        .exec()
    );

    return {
      data: options.formatData
        ? options.formatData(document[0].data)
        : (document[0].data as unknown as ReadonlyArray<K>),
      count: document[0].count[0]?.total ?? 0,
    };
  };
}
