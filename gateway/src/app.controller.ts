import { Body, Controller, Delete, Get, Inject, OnApplicationBootstrap, Param, Post, Put, Session, Sse } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, fromEvent, interval, map, Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class AppController implements OnApplicationBootstrap{
  constructor(
    @Inject('Order_Service') private  order:ClientProxy, private eventEmitter: EventEmitter2,
  ) {}


  
  onApplicationBootstrap() {
    this.order.connect().then(()=>console.log("successfully connected order service"))
  }

 
  @Get('/orders')
  async getOrders(@Session() {id}:{id:string}): Promise<any> {
   
    return  await firstValueFrom(this.order.send({cmd:'get_orders'},id));
  }

  @Get('/orders/:id')
  async getOrder(@Param('id')id:number): Promise<any> {
    return  await firstValueFrom(this.order.send({cmd:'get_order'},id));
  }

  @Delete('/orders/:id')
  async deleteOrder(@Param('id')id:string): Promise<any> {
    const value=  await firstValueFrom(this.order.send({cmd:'delete_order'},id));
    this.eventEmitter.emit('order-change',{type:'delete',data:value.data})
    return {success:true,message:'successfully deleted data',data:null};
  }

  @Put('/orders/:id')
  async updateOrder(@Param('id')id:string,@Body()updateOrderDto:{qty:number,itemId:string}): Promise<any> {
    const value=  await firstValueFrom(this.order.send({cmd:'update_order'},{id,updateOrderDto}));
    this.eventEmitter.emit('order-change',{type:'update',data:value.data})
    return {success:true,message:'Update Successful',data:null};
  }

  @Post("/orders/")
  async createOrder(@Body() updateOrderDto:{qty:number,itemId:string},@Session() {id}:{id:string}): Promise<any> {
    const value=  await firstValueFrom(this.order.send({cmd:'create_order'},{...updateOrderDto,sessId:id,}));
    this.eventEmitter.emit('order-change',{type:'add',data:value.data})
    return {success:true,message:'Created Successfully',data:null};
  }
  

  @Sse('admin/orders')
   getOrdersSSE(@Session() {id}:{id:string}): Observable<any> {
    // console.log("sdfsfsdf")
    return fromEvent(this.eventEmitter, 'order-change').pipe(
      map((data) => {
        return new MessageEvent('message', { data });
      }),
    );
  }

  @Get('admin')
  async getAllOrder(){
    const value=  await firstValueFrom(this.order.send({cmd:'get_adm_orders'},{}));
  return value
  }
 
}
