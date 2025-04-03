import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AddressService } from './address.service';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { Address } from './entities/address.entity';
import {
  UseGuards,
  Logger,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
import { User, UserRole } from '../user/entities/user.entity';
import { Roles } from 'src/session/decorator/roles.decorator';
import { RolesGuard } from 'src/session/guard/role.guard';
import { CurrentUser } from 'src/session/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/session/guard/jwt-auth.guard';
import { AddressResponse } from './dto/address-response.dto';
import { SearchAddressInput } from './dto/search-address.input';
import { UserService } from 'src/user/user.service';

@Resolver(() => Address)
export class AddressResolver {
  private readonly logger = new Logger(AddressResolver.name);

  constructor(
    private readonly addressService: AddressService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Address)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async createAddress(
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
    @CurrentUser() user: User,
  ) {
    try {
      // Validate input data
      this.logger.error(
        `user ${user.id} is trying to create address: ${createAddressInput.street}`,
      );

      // Verify user has permission to create address for this shop
      if (!user) {
        throw new ForbiddenException(
          'only registered users can create address',
        );
      }

      const address = await this.addressService.create(createAddressInput);
      return {
        success: true,
        message: 'Address created successfully',
        address: address.dataValues,
      };
    } catch (error) {
      this.logger.error(
        `Failed to create address: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => AddressResponse, { name: 'Addresss' })
  async findAll(
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Use Promise.all for parallel execution
      const [addresss, totalCount] = await Promise.all([
        this.addressService.findAll(paginationParams),
        this.addressService.countAddresss(),
      ]);

      return {
        items: addresss,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch addresss: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => AddressResponse, { name: 'SearchAddresss' })
  async searchAddresss(
    @Args('searchInput') searchInput: SearchAddressInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      const {
        name,
        street,
        city,
        state_province_code,
        state_province_name,
        country_code,
        country,
      } = searchInput;

      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Build filter criteria
      const filter: any = {};
      if (street) filter.street = street;
      if (city) filter.city = city;
      if (state_province_name) filter.state_province_name = state_province_name;
      if (state_province_code) filter.state_province_code = state_province_code;
      if (country_code) filter.country_code = country_code;
      if (country) filter.country = country;

      let addresss;
      let totalCount;

      if (name) {
        // If name is provided, use search functionality
        [addresss, totalCount] = await Promise.all([
          this.addressService.search(name, paginationParams),
          this.addressService.countSearchResults(name, filter),
        ]);
      } else {
        // Otherwise use filter
        [addresss, totalCount] = await Promise.all([
          this.addressService.filterBy(filter, paginationParams),
          this.addressService.countAddresss(filter),
        ]);
      }

      return {
        items: addresss,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to search addresss: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => Address, { name: 'Address' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Address ID is required');
      }

      const address = await this.addressService.findOne({ id });
      if (!address) {
        throw new NotFoundException(`Address with ID ${id} not found`);
      }

      return address.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to find address: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Mutation(() => Address)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async updateAddress(
    @Args('updateAddressInput') updateAddressInput: UpdateAddressInput,
    @CurrentUser() user: User,
  ) {
    try {
      if (!updateAddressInput.id) {
        throw new BadRequestException('Address ID is required for update');
      }
      // Check if user has permission to update this address
      const address = await this.addressService.findOne({
        id: updateAddressInput.id,
      });

      if (address.userId !== user.id) {
        throw new ForbiddenException(
          'You can only update addresss from your own shop',
        );
      }

      const data = await this.addressService.update(
        updateAddressInput.id,
        updateAddressInput,
      );

      return data.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to update address: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Mutation(() => Address)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async removeAddress(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ) {
    try {
      if (!id) {
        throw new BadRequestException('Address ID is required');
      }

      // Check if user has permission to delete this address
      const address = await this.addressService.findOne({ id });

      if (address.userId !== user.id) {
        throw new ForbiddenException(
          'You can only delete addresss from your own shop',
        );
      }

      const result = await this.addressService.remove(id);
      return result.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to remove address: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => AddressResponse, { name: 'MyShopAddresss' })
  @UseGuards(JwtAuthGuard)
  async getMyShopAddresss(
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

      const [addresss, totalCount] = await Promise.all([
        this.addressService.filterBy(filter, paginationParams),
        this.addressService.countAddresss(filter),
      ]);

      return {
        items: addresss,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch shop addresss: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @ResolveField()
  async user(@Parent() address: Address) {
    try {
      const { userId } = address;
      if (!userId) return null;

      const user = await this.userService.findOne({ id: userId });
      return user ? user.dataValues : null;
    } catch (error) {
      this.logger.error(
        `Failed to resolve user: ${error.message}`,
        error.stack,
      );
      return null;
    }
  }
}
