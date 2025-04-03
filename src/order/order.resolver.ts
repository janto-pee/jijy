import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OrderService } from './order.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { OrderResponse } from './dto/order-response.dto';
import {
  UseGuards,
  Logger,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
import { Op } from 'sequelize';
import { User, UserRole } from '../user/entities/user.entity';
import { Roles } from 'src/session/decorator/roles.decorator';
import { RolesGuard } from 'src/session/guard/role.guard';
import { CurrentUser } from 'src/session/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/session/guard/jwt-auth.guard';
import { SearchOrderInput } from 'src/order/dto/search-order.input';

@Resolver(() => Order)
export class OrderResolver {
  private readonly logger = new Logger(OrderResolver.name);

  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => OrderResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @CurrentUser() user: User,
  ) {
    try {
      // Validate input data
      this.logger.error(
        `user ${user.id} with shopId: ${user.shopId} is trying to create order: ${createOrderInput.businessClientCode}`,
      );

      if (
        !createOrderInput.businessClientCode ||
        !createOrderInput.shippingDate
      ) {
        throw new BadRequestException('Order name and price are required');
      }

      // Add user context
      if (user.shopId) {
        createOrderInput.shopId = createOrderInput.shopId || user.shopId;
      }

      // Verify user has permission to create order for this shop
      if (
        user.role !== UserRole.ADMIN &&
        createOrderInput.shopId !== user.shopId
      ) {
        throw new ForbiddenException(
          'You can only create orders for your own shop',
        );
      }

      const order = await this.orderService.create(createOrderInput);
      return {
        success: true,
        message: 'Order created successfully',
        order: order.dataValues,
      };
    } catch (error) {
      this.logger.error(
        `Failed to create order: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => OrderResponse, { name: 'Orders' })
  async findAll(
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Use Promise.all for parallel execution
      const [orders, totalCount] = await Promise.all([
        this.orderService.findAll(paginationParams),
        this.orderService.countOrders(),
      ]);

      return {
        items: orders,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch orders: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => OrderResponse, { name: 'SearchOrders' })
  async searchOrders(
    @Args('searchInput') searchInput: SearchOrderInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      const { term, shopId, shippingDate } = searchInput;

      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Build filter criteria
      const filter: any = {};

      if (shopId) filter.shopId = shopId;
      if (shippingDate) filter.shippingDate = shippingDate;

      let orders;
      let totalCount;

      if (term) {
        // If term is provided, use search functionality
        [orders, totalCount] = await Promise.all([
          this.orderService.search(term, paginationParams),
          this.orderService.countSearchResults(term, filter),
        ]);
      } else {
        // Otherwise use filter
        [orders, totalCount] = await Promise.all([
          this.orderService.filterBy(filter, paginationParams),
          this.orderService.countOrders(filter),
        ]);
      }

      return {
        items: orders,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to search orders: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => Order, { name: 'Order' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Order ID is required');
      }

      const order = await this.orderService.findOne({ id });
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      return order.dataValues;
    } catch (error) {
      this.logger.error(`Failed to find order: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
    @CurrentUser() user: User,
  ) {
    try {
      if (!updateOrderInput.id) {
        throw new BadRequestException('Order ID is required for update');
      }

      // Add validation for required fields
      if (updateOrderInput.shopId) {
        throw new BadRequestException('shopId must be specified');
      }

      // Check if user has permission to update this order
      const order = await this.orderService.findOne({
        id: updateOrderInput.id,
      });

      if (user.role !== UserRole.ADMIN && order.shopId !== user.shopId) {
        throw new ForbiddenException(
          'You can only update orders from your own shop',
        );
      }

      const data = await this.orderService.update(
        updateOrderInput.id,
        updateOrderInput,
      );

      return data.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to update order: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async removeOrder(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ) {
    try {
      if (!id) {
        throw new BadRequestException('Order ID is required');
      }

      // Check if user has permission to delete this order
      const order = await this.orderService.findOne({ id });

      if (user.role !== UserRole.ADMIN && order.shopId !== user.shopId) {
        throw new ForbiddenException(
          'You can only delete orders from your own shop',
        );
      }

      const result = await this.orderService.remove(id);
      return result.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to remove order: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => OrderResponse, { name: 'MyShopOrders' })
  @UseGuards(JwtAuthGuard)
  async getMyShopOrders(
    @CurrentUser() user: User,
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      if (!user.shopId) {
        throw new BadRequestException(
          'You do not have a shop associated with your account',
        );
      }

      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      const filter = { shopId: user.shopId };

      const [orders, totalCount] = await Promise.all([
        this.orderService.filterBy(filter, paginationParams),
        this.orderService.countOrders(filter),
      ]);

      return {
        items: orders,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch shop orders: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  // ResolveField methods remain the same
  // @ResolveField()
  // async attributes(@Parent() order: Order) {
  //   try {
  //     const { id } = order;
  //     const attribute = await this.attributeService.findOne({ orderId: id });
  //     return attribute ? attribute.dataValues : null;
  //   } catch (error) {
  //     this.logger.error(
  //       `Failed to resolve attributes: ${error.message}`,
  //       error.stack,
  //     );
  //     return null;
  //   }
  // }
}
