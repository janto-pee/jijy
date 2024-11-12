import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-Order.input';
import { UpdateOrderInput } from './dto/update-Order.input';
import { Order } from './entities/Order.entity';

@Injectable()
export class OrdersService {
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
    return await this.OrdersRepository.findAll<Order>();
  }

  async findOne(id: number): Promise<Order> {
    return await this.OrdersRepository.findOne<Order>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<Order> {
    return await this.OrdersRepository.findOne<Order>({
      where: { email: email },
    });
  }

  async update(where: any, data: UpdateOrderInput): Promise<Order> {
    const Order = await this.OrdersRepository.findOne({
      where: { ...where },
    });
    await Order.update({ ...data });
    await Order.save();
    return Order;
  }

  async remove(id: number): Promise<Order> {
    return await this.OrdersRepository.findOne<Order>({
      where: { id: id },
    });
  }
}
