import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ShopService } from './shop.service';
import { CreateShopInput } from './dto/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';
import { Shop } from './entities/shop.entity';
import { ShopResponse } from './dto/shop-response.dto';
import {
  UseGuards,
  Logger,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
// import { Op } from 'sequelize';
import { User, UserRole } from '../user/entities/user.entity';
import { Roles } from 'src/session/decorator/roles.decorator';
import { RolesGuard } from 'src/session/guard/role.guard';
import { CurrentUser } from 'src/session/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/session/guard/jwt-auth.guard';
import { SearchShopInput } from './dto/search-shop.input';

@Resolver(() => Shop)
export class ShopResolver {
  private readonly logger = new Logger(ShopResolver.name);

  constructor(private readonly shopService: ShopService) {}

  @Mutation(() => ShopResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async createShop(
    @Args('createShopInput') createShopInput: CreateShopInput,
    @CurrentUser() user: User,
  ) {
    try {
      // Validate input data
      this.logger.error(
        `user ${user.id} with shopId: ${user.shopId} is trying to create shop: ${createShopInput.name}`,
      );

      if (!createShopInput.name || !createShopInput.email) {
        throw new BadRequestException('Shop name and email are required');
      }

      // Verify user has permission to create shop for this shop
      if (user.role !== UserRole.SELLER) {
        throw new ForbiddenException(
          'You can only create shops for your own shop',
        );
      }

      const shop = await this.shopService.create(createShopInput);
      user.shopId = shop.id;
      await user.save();
      return {
        success: true,
        message: 'Shop created successfully',
        shop: shop.dataValues,
      };
    } catch (error) {
      this.logger.error(`Failed to create shop: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Query(() => ShopResponse, { name: 'Shops' })
  async findAll(
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Use Promise.all for parallel execution
      const [shops, totalCount] = await Promise.all([
        this.shopService.findAll(paginationParams),
        this.shopService.countShops(),
      ]);

      return {
        items: shops,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(`Failed to fetch shops: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Query(() => ShopResponse, { name: 'SearchShops' })
  async searchShops(
    @Args('searchInput') searchInput: SearchShopInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      const { name } = searchInput;

      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Build filter criteria
      const filter: any = {};

      let shops;
      let totalCount;

      if (name) {
        // If name is provided, use search functionality
        [shops, totalCount] = await Promise.all([
          this.shopService.search(name, paginationParams),
          this.shopService.countSearchResults(name, filter),
        ]);
      } else {
        // Otherwise use filter
        [shops, totalCount] = await Promise.all([
          this.shopService.filterBy(filter, paginationParams),
          this.shopService.countShops(filter),
        ]);
      }

      return {
        items: shops,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to search shops: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => Shop, { name: 'Shop' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Shop ID is required');
      }

      const shop = await this.shopService.findOne({ id });
      if (!shop) {
        throw new NotFoundException(`Shop with ID ${id} not found`);
      }

      return shop.dataValues;
    } catch (error) {
      this.logger.error(`Failed to find shop: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Mutation(() => Shop)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async updateShop(
    @Args('updateShopInput') updateShopInput: UpdateShopInput,
    @CurrentUser() user: User,
  ) {
    try {
      if (!updateShopInput.id) {
        throw new BadRequestException('Shop ID is required for update');
      }

      // Add validation for required fields
      if (updateShopInput.name) {
        throw new BadRequestException('shop name is required');
      }

      // Check if user has permission to update this shop
      const shop = await this.shopService.findOne({
        id: updateShopInput.id,
      });

      if (user.role !== UserRole.ADMIN && shop.id !== user.shopId) {
        throw new ForbiddenException(
          'You can only update shops from your own shop',
        );
      }

      const data = await this.shopService.update(
        updateShopInput.id,
        updateShopInput,
      );

      return data.dataValues;
    } catch (error) {
      this.logger.error(`Failed to update shop: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Mutation(() => Shop)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async removeShop(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ) {
    try {
      if (!id) {
        throw new BadRequestException('Shop ID is required');
      }

      // Check if user has permission to delete this shop
      const shop = await this.shopService.findOne({ id });

      if (user.role !== UserRole.ADMIN && shop.id !== user.shopId) {
        throw new ForbiddenException(
          'You can only delete shops from your own shop',
        );
      }

      const result = await this.shopService.remove(id);
      return result.dataValues;
    } catch (error) {
      this.logger.error(`Failed to remove shop: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Query(() => ShopResponse, { name: 'MyShopShops' })
  @UseGuards(JwtAuthGuard)
  async getMyShopShops(
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

      const [shops, totalCount] = await Promise.all([
        this.shopService.filterBy(filter, paginationParams),
        this.shopService.countShops(filter),
      ]);

      return {
        items: shops,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch shop shops: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  // ResolveField methods remain the same
  // @ResolveField()
  // async attributes(@Parent() shop: Shop) {
  //   try {
  //     const { id } = shop;
  //     const attribute = await this.attributeService.findOne({ shopId: id });
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
