import { DocumentDefinition, Schema, SchemaDefinition } from 'mongoose';

export default (schemaDefinition: SchemaDefinition<DocumentDefinition<any>>) =>
  new Schema<any, any>(
    {
      id: { type: String, required: true, trim: true, unique: true, index: true },
      _id: { type: String, select: false },
      disabled: { type: Boolean, default: false },
      disabledAt: { type: Date, required: false },
      ...schemaDefinition,
    },
    { timestamps: true, versionKey: false }
  );
