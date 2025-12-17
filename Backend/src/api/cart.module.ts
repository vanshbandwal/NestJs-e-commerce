import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({
    type: [
      {
        productId: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    default: [],
  })
  items: {
    productId: Types.ObjectId;
    quantity: number;
  }[];
  _id?: Types.ObjectId;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
