import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderService } from './order.service';
import { ShopService } from 'src/shop/shop.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly shopService: ShopService,
  ) {}

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
    const data = await this.orderService.findOne({ id: id });
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

  /**
   *
   * RESOLVER
   */
  @ResolveField()
  async shop(@Parent() order: Order) {
    const { shopId } = order;
    return (await this.shopService.findOne({ id: shopId })).dataValues;
  }
}
