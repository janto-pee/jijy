import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    return (await this.orderService.create(createOrderInput)).dataValues;
  }

  @Query(() => [Order], { name: 'Orders' })
  async findAll() {
    return await this.orderService.findAll();
  }

  @Query(() => Order, { name: 'Order' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    const data = await this.orderService.findOne(id);
    if (!data) {
      throw new Error('data not found');
    }
    return data.dataValues;
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ) {
    const data = await this.orderService.update(
      updateOrderInput.id,
      updateOrderInput,
    );
    return data.dataValues;
  }

  @Mutation(() => Order)
  async removeOrder(@Args('id', { type: () => String }) id: string) {
    const data = await this.orderService.remove(id);
    if (!data) {
      throw new Error('address not found');
    }
    return data.dataValues;
  }
}
