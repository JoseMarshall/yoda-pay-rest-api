import { makeObjectSchema, makeStringSchema } from '../../builders';

// eslint-disable-next-line import/prefer-default-export
export const accountSchema = makeObjectSchema({
  required: ['name', 'cpf', 'phone', 'address'],
  properties: {
    name: makeStringSchema({
      description: 'The account owner name',
      example: 'John Doe',
    }),
    cpf: makeStringSchema({
      description: 'The CPF number',
      example: '68814688',
    }),
    phone: makeStringSchema({
      example: '9xxxxxxxx',
      description: 'The phone number',
    }),
    address: makeStringSchema({
      example: 'Avenida Nova Olinda 1563',
      description: 'The account owner address',
    }),
  },
});
