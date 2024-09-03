import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Status {
  Served = 'served',
  Placed = 'placed',
  Cooking = 'cooking',
}

@Schema()
export class Order extends Document {
  @Prop({ type: String, required: true })
  itemId: string;

  @Prop({ type: String, required: true })
  sessId: string;

  @Prop({ type: Number, required: true })
  qty: number;

  @Prop({ type: String, enum: Status, required: true, default: 'placed' })
  status: Status;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
