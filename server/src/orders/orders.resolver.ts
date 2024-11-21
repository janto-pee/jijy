import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Resolver('Order')
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation('createOrder')
  async create(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return await this.ordersService.create(createOrderInput);
  }

  @Query('orders')
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Query('order')
  async findOne(@Args('id') id: number) {
    return await this.ordersService.findOne(id);
  }

  @Mutation('updateOrder')
  async update(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return await this.ordersService.update(
      updateOrderInput.id,
      updateOrderInput,
    );
  }

  @Mutation('removeOrder')
  async remove(@Args('id') id: number) {
    return await this.ordersService.remove(id);
  }
}
