import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private OrdersRepository: typeof Order,
  ) {}
  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    return await this.OrdersRepository.create({
      ...createOrderInput,
    });
  }

  async findAll(): Promise<Order[]> {
    return await this.OrdersRepository.findAll<Order>({ raw: true });
  }

  async findOne(search: any): Promise<Order> {
    const order = await this.OrdersRepository.findOne<Order>({
      where: search,
    });
    if (!order) {
      throw new Error();
    }
    return order;
  }

  async findEmail(email: string): Promise<Order> {
    const order = await this.OrdersRepository.findOne<Order>({
      where: { email: email },
    });
    if (!order) {
      throw new Error();
    }
    return order;
  }

  async update(id: string, data: UpdateOrderInput): Promise<Order> {
    const Order = await this.OrdersRepository.findOne({
      where: { id: id },
    });
    if (!Order) {
      throw new Error('Order not found');
    }
    await Order.update({ ...data });
    await Order.save();
    return Order;
  }

  async remove(id: string): Promise<Order> {
    const order = await this.OrdersRepository.findOne<Order>({
      where: { id: id },
    });
    if (!order) {
      throw new Error();
    }
    await order.destroy();
    return order;
  }
}
