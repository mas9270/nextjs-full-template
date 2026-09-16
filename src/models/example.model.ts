import { Schema, model, models, Document, Model } from 'mongoose';

export interface IExampleDocument extends Document {
  title: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExampleSchema = new Schema<IExampleDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ExampleModel: Model<IExampleDocument> =
  models.Example || model<IExampleDocument>('Example', ExampleSchema);
