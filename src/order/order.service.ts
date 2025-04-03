import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { WhereOptions, Op, FindOptions } from 'sequelize';
import { PaginationArgs } from 'src/common/dto/pagination.dto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @Inject('ORDER_REPOSITORY')
    private OrdersRepository: typeof Order,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    try {
      return await this.OrdersRepository.create(
        {
          ...createOrderInput,
        },
        { raw: true },
      );
    } catch (error) {
      this.logger.error(
        `Failed to create order: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(pagination?: PaginationArgs): Promise<Order[]> {
    try {
      const options: FindOptions = { raw: true };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        // options.order = [['createdAt', 'DESC']];
      }

      return await this.OrdersRepository.findAll<Order>(options);
    } catch (error) {
      this.logger.error(
        `Failed to fetch orders: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async filterBy(
    search: WhereOptions<any>,
    pagination?: PaginationArgs,
    sortOptions?: { sortBy?: string; sortOrder?: 'ASC' | 'DESC' },
  ): Promise<Order[]> {
    try {
      const options: FindOptions = {
        where: search,
        raw: true,
      };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        // options.order = [['createdAt', 'DESC']];
      }
      // Apply sorting if provided
      // if (sortOptions && sortOptions.sortBy) {
      (sortOptions && sortOptions.sortOrder) || 'ASC';
      //   options.order = [[sortOptions.sortBy, order]];
      // } else {
      //   options.order = [['createdAt', 'DESC']];
      // }

      return await this.OrdersRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to filter orders: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async search(term: string, pagination?: PaginationArgs): Promise<Order[]> {
    try {
      const options: FindOptions = {
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${term}%` } },
            { description: { [Op.iLike]: `%${term}%` } },
            { parentSku: { [Op.iLike]: `%${term}%` } },
            { sellerSku: { [Op.iLike]: `%${term}%` } },
          ],
        },
        raw: true,
      };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        // options.order = [['createdAt', 'DESC']];
      }

      return await this.OrdersRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to search orders: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async countSearchResults(
    term: string,
    additionalFilters: WhereOptions<any> = {},
  ): Promise<number> {
    try {
      const searchCondition = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${term}%` } },
          { description: { [Op.iLike]: `%${term}%` } },
          { parentSku: { [Op.iLike]: `%${term}%` } },
          { sellerSku: { [Op.iLike]: `%${term}%` } },
        ],
      };

      // Combine search condition with additional filters
      const whereCondition = { ...searchCondition };

      // Add additional filters if they exist
      if (Object.keys(additionalFilters).length > 0) {
        whereCondition[Op.and] = [whereCondition[Op.or], additionalFilters];
        // delete whereCondition[Op.or]; ---------------------revisit
      }

      return await this.OrdersRepository.count({
        where: whereCondition,
      });
    } catch (error) {
      this.logger.error(
        `Failed to count search results: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findOne(search: WhereOptions<any>): Promise<Order> {
    try {
      const order = await this.OrdersRepository.findOne<Order>({
        where: search,
      });

      if (!order) {
        throw new NotFoundException(`Order not found`);
      }

      return order;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to find order: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, data: UpdateOrderInput): Promise<Order> {
    try {
      const order = await this.OrdersRepository.findOne({
        where: { id },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      await order.update({ ...data });
      await order.save();

      return order;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to update order: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string): Promise<Order> {
    try {
      const order = await this.OrdersRepository.findOne<Order>({
        where: { id },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      await order.destroy();
      return order;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to remove order: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async countOrders(filter?: WhereOptions<any>): Promise<number> {
    try {
      return await this.OrdersRepository.count({
        where: filter || {},
      });
    } catch (error) {
      this.logger.error(
        `Failed to count orders: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}

// import { Inject, Injectable } from '@nestjs/common';
// import { CreateOrderInput } from './dto/create-order.input';
// import { UpdateOrderInput } from './dto/update-order.input';
// import { Order } from './entities/order.entity';

// @Injectable()
// export class OrderService {
//   constructor(
//     @Inject('ORDER_REPOSITORY')
//     private OrdersRepository: typeof Order,
//   ) {}
//   async create(createOrderInput: CreateOrderInput): Promise<Order> {
//     return await this.OrdersRepository.create({
//       // ...createOrderInput,
//     });
//   }

//   async findAll(): Promise<Order[]> {
//     return await this.OrdersRepository.findAll<Order>({ raw: true });
//   }

//   async findOne(search: any): Promise<Order> {
//     const order = await this.OrdersRepository.findOne<Order>({
//       where: search,
//     });
//     if (!order) {
//       throw new Error();
//     }
//     return order;
//   }

//   async findEmail(email: string): Promise<Order> {
//     const order = await this.OrdersRepository.findOne<Order>({
//       where: { email: email },
//     });
//     if (!order) {
//       throw new Error();
//     }
//     return order;
//   }

//   async update(id: string, data: UpdateOrderInput): Promise<Order> {
//     const Order = await this.OrdersRepository.findOne({
//       where: { id: id },
//     });
//     if (!Order) {
//       throw new Error('Order not found');
//     }
//     await Order.update({ ...data });
//     await Order.save();
//     return Order;
//   }

//   async remove(id: string): Promise<Order> {
//     const order = await this.OrdersRepository.findOne<Order>({
//       where: { id: id },
//     });
//     if (!order) {
//       throw new Error();
//     }
//     await order.destroy();
//     return order;
//   }
// }
