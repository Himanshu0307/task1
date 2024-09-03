import { Document } from 'mongoose';
import { Status } from 'src/schema/schema'; // Ensure this path is correct

export interface IOrder extends Document {
  readonly itemId: String;
  readonly sessId: String;
  readonly qty: Number;
  readonly status: Status; // Use the enum type directly
}
