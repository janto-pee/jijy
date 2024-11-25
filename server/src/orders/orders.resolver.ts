import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { ShopsService } from 'src/shops/shops.service';
import { ProductService } from 'src/product/product.service';

@Resolver('Order')
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly shopsService: ShopsService,
    private readonly productService: ProductService,
  ) {}

  @Mutation('createOrder')
  async create(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    const shop = await this.shopsService.findOne(createOrderInput.shop);
    if (!shop) {
      throw new Error('shop not found ');
    }
    const product = await this.productService.findOne(createOrderInput.product);
    if (!product) {
      throw new Error('product not found ');
    }

    const order = await this.ordersService.create(createOrderInput);
    order.shop = shop;
    order.product = product;
    await order.save();
    return;
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
