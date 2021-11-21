import { CollectionNames } from '../../../../../constants';
import { MongoHelper } from '../helpers/mongo-helper';
import SchemaConstructor from './schema-constructor';

const accountSchema = SchemaConstructor({
  name: { type: String, required: true, trim: true, maxlength: 50 },
  cpf: { type: String, required: true, trim: true, unique: true, maxlength: 12 },
  phone: { type: String, required: true, trim: true, maxlength: 15 },
  address: { type: String, required: true, trim: true, maxlength: 30 },
});

accountSchema.set('toObject', {
  virtuals: true,
});

accountSchema.set('toJSON', {
  virtuals: true,
});

export default MongoHelper.getModel(CollectionNames.Accounts, accountSchema);
