import { IsString, MaxLength, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  readonly itemId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly qty: number;

  @IsString()
  @IsNotEmpty()
  readonly sessionId: string;
}
