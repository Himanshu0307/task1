import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderDto } from "./orderDto";

export class UpdateOrderDto extends PartialType(CreateOrderDto){
    
}