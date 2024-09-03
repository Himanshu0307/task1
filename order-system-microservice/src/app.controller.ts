import { Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/orderDto';
import { UpdateOrderDto } from './dto/updateOrderDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_orders' })
  async getOrders(sessionId: string): Promise<any> {
    // console.log('payload', sessionId);
    const list = await this.appService.getOrderList(sessionId);
    return { data: list, success: true };
  }

  @MessagePattern({ cmd: 'create_order' })
  async postOrder(orderDto: CreateOrderDto) {
    const order = await this.appService.createOrder(orderDto);
    return { data: order, success: true };
  }

  @MessagePattern({ cmd: 'update_order' })
  async updateOrder({
    id,
    updateDto,
  }: {
    id: string;
    updateDto: UpdateOrderDto;
  }) {
    const order = await this.appService.updateOrder(id, updateDto);
    return { data: order, success: true };
  }

  @MessagePattern({ cmd: 'delete_order' })
  async deleteOrder(id: string) {
    const order = await this.appService.deleteOrder(id);
    return { data: order, success: true };
  }

  @MessagePattern({ cmd: 'get_order' })
  async getOrder(id: number) {
    const order = await this.appService.getOrder(id);
    return { data: order, success: true };
  }

  @MessagePattern({ cmd: 'test' })
  testMe(): String {
    console.log('Method Invoked');
    return 'hello World';
  }
  @MessagePattern({ cmd: 'get_adm_orders' })
  async getAllOrdersForAdmin() {
    const order = await this.appService.getAllOrderList();
    return { data: order, success: true };
  }
}
