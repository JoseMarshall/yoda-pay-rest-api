import { TimeStamps } from '../enums';
import {
  MakeArraySchema,
  MakeGeneralResponseBodySchema,
  MakeIntegerSchema,
  MakeObjectSchema,
  MakeQueryParamSchema,
  MakeRequestBodySchema,
  MakeResponseBodySchema,
  MakeStringSchema,
} from './builders-protocols';

export const makeStringSchema: MakeStringSchema = data => ({
  ...data,
  type: 'string',
});

export const makeArraySchema: MakeArraySchema = items => ({
  ...items,
  type: 'array',
});

export const makeObjectSchema: MakeObjectSchema = data => ({
  ...data,
  type: 'object',
});

export const makeIntegerSchema: MakeIntegerSchema = data => ({
  ...data,
  type: 'integer',
});

export const makeQueryParamSchema: MakeQueryParamSchema = data => ({
  ...data,
  allowReserved: true,
  in: 'query',
});

export const makeBooleanSchema = (description = '') => ({ type: 'boolean', description });

export const getRequestBodySchemaRef = (x: string) => ({
  $ref: `#/schemas/requestBody/${x}`,
});

export const getResponseBodySchemaRef = (x: string) => ({
  $ref: `#/schemas/responseBody/${x}`,
});

export const makeMsgBodySchema: MakeObjectSchema = payloadObjSchemaDefinition => ({
  type: 'object',
  required: ['msg', 'payload'],
  properties: {
    msg: makeStringSchema({
      description: 'The message comming from the server response',
      example: 'request done successfully',
    }),
    payload: makeObjectSchema(payloadObjSchemaDefinition),
  },
});

export const makeRequestBodySchema: MakeRequestBodySchema = (properties, required) => ({
  type: 'object',
  properties,
  required,
});

export const makeGetAllResponseBodySchema: MakeResponseBodySchema = (
  payloadProps,
  description,
  requiredFields = []
) =>
  makeMsgBodySchema({
    required: ['data', 'count'],
    properties: {
      data: makeArraySchema({
        description: 'The array of items that match the query',
        items: makeObjectSchema({
          required: [...requiredFields, 'id', TimeStamps.CreatedAt, TimeStamps.UpdatedAt],
          description: description ?? 'The signature of each item in this collection result',
          properties: {
            id: makeStringSchema({
              description: 'the unique identifier for this record in database',
              example: '656e3b6d-c06f-4506-9181-99abb3afdef0',
            }),
            disabled: makeBooleanSchema('Indicates if this entity is disabled'),
            disabledAt: makeStringSchema({
              description: 'the date this entity has been disabled',
              format: 'date-time',
            }),
            [TimeStamps.CreatedAt]: makeStringSchema({
              description: 'the date this record was created on database',
              format: 'date-time',
            }),
            [TimeStamps.UpdatedAt]: makeStringSchema({
              description: 'the date this record was last updated on database',
              format: 'date-time',
            }),
            ...payloadProps,
          },
        }),
      }),

      count: makeIntegerSchema({
        example: 1,
        description: 'the total count of this query result',
      }),
    },
  });

export const makeGeneralResponseBodySchema: MakeGeneralResponseBodySchema = (
  payloadProps,
  requiredFields = []
) =>
  makeMsgBodySchema({
    required: [...requiredFields, 'disabled', TimeStamps.CreatedAt, TimeStamps.UpdatedAt],
    properties: {
      _id: makeStringSchema({
        description: 'the unique identifier for this record on database',
        example: '0778d592-ad9f-4ed2-8c8e-ca11d6b0231d',
      }),

      disabled: makeBooleanSchema('Indicates if this entity is disabled'),
      disabledAt: makeStringSchema({
        description: 'the date this entity has been disabled',
        format: 'date-time',
      }),
      [TimeStamps.CreatedAt]: makeStringSchema({
        description: 'the date this record was created on database',
        format: 'date-time',
      }),
      [TimeStamps.UpdatedAt]: makeStringSchema({
        description: 'the date this record was last updated on database',
        format: 'date-time',
      }),
      ...payloadProps,
    },
  });

export const paginationParamsArray = [
  makeQueryParamSchema({
    name: 'page',
    type: 'integer',
    description: 'The pagination page starting from 1',
    required: true,
    example: '1',
  }),
  makeQueryParamSchema({
    name: 'limit',
    type: 'integer',
    description: 'The maximum of items per page in the pagination, it defaults to 15',
    required: false,
    example: '10',
  }),
];
