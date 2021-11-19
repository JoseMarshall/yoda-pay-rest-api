// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

export default Array.from({ length: 20 }, () => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  cpf: faker.finance.account(5),
  phone: faker.phone.phoneNumber('### ### ###'),
  address: faker.address.streetAddress(false),
  createdAt: new Date(),
  updatedAt: new Date(),
}));
