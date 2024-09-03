import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrder } from './interface/order.interface';
import { UpdateOrderDto } from './dto/updateOrderDto';
import { CreateOrderDto } from './dto/orderDto';
import { Order } from './schema/schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<IOrder>,
  ) {}

  // for admin : fetch all orders
  async getAllOrderList() {
    const orders = await this.orderModel.find();

    return orders;
  }

  async getOrderList(sessionId: string) {
    const orders = await this.orderModel.find({
      sessId: sessionId,
    });

    return orders;
  }

  async createOrder(orderDto: CreateOrderDto) {
    const order = await this.orderModel.create(orderDto);

    if (!order) {
      throw new InternalServerErrorException('Failed to create order');
    }
    return order;
  }

  async deleteOrder(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id);
    if (!order) {
      throw new BadRequestException('Order does not exist');
    }
    return order;
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { ...updateOrderDto, _id: id },
      {
        new: true,
      },
    );
    if (!order) {
      throw new BadRequestException('Order does not exist');
    }
    return order;
  }

  async getOrder(id) {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new BadRequestException('Order does not exist');
    }
    return order;
  }
}
