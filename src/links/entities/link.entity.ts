import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Model, HydratedDocument } from 'mongoose';

@Schema({
  _id: true,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Link {
  @Prop({
    type: String,
    required: true,
    trim: true,
    unique: true,
  })
  code: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  link: string;

  @Prop({
    type: Date,
  })
  expireAt?: Date; // optional expire at
}
/**
 * Document typing and model
 */
export type LinkDocument = HydratedDocument<Link>;
export type LinkModel = Model<LinkDocument>;
/**
 * Schema from class
 */
export const LinkSchema = SchemaFactory.createForClass(Link);
