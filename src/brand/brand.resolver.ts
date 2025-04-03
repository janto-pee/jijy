import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BrandService } from './brand.service';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { Brand } from './entities/brand.entity';
import { ProductService } from 'src/product/product.service';
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
import { BrandResponse } from './dto/brand-response.dto';
import { SearchBrandInput } from './dto/search-brand.input';
import { ShopService } from 'src/shop/shop.service';

@Resolver(() => Brand)
export class BrandResolver {
  private readonly logger = new Logger(BrandResolver.name);

  constructor(
    private readonly brandService: BrandService,
    private readonly productService: ProductService,
    private readonly shopService: ShopService,
  ) {}

  @Mutation(() => Brand)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async createBrand(
    @Args('createBrandInput') createBrandInput: CreateBrandInput,
    @CurrentUser() user: User,
  ) {
    try {
      // Validate input data
      this.logger.error(
        `user ${user.id} with shopId: ${user.shopId} is trying to create brand: ${createBrandInput.name}`,
      );

      if (!createBrandInput.name || !createBrandInput.code) {
        throw new BadRequestException('Brand name and price are required');
      }

      // Add user context
      if (user.shopId) {
        createBrandInput.shopId = createBrandInput.shopId || user.shopId;
      }

      // Verify user has permission to create brand for this shop
      if (
        user.role !== UserRole.ADMIN ||
        createBrandInput.shopId !== user.shopId
      ) {
        throw new ForbiddenException(
          'You can only create brands for your own shop',
        );
      }

      const brand = await this.brandService.create(createBrandInput);
      return {
        success: true,
        message: 'Brand created successfully',
        brand: brand.dataValues,
      };
    } catch (error) {
      this.logger.error(
        `Failed to create brand: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => BrandResponse, { name: 'Brands' })
  async findAll(
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Use Promise.all for parallel execution
      const [brands, totalCount] = await Promise.all([
        this.brandService.findAll(paginationParams),
        this.brandService.countBrands(),
      ]);

      return {
        items: brands,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch brands: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => BrandResponse, { name: 'SearchBrands' })
  async searchBrands(
    @Args('searchInput') searchInput: SearchBrandInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      const { name } = searchInput;

      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Build filter criteria
      const filter: any = {};

      let brands;
      let totalCount;

      if (name) {
        // If name is provided, use search functionality
        [brands, totalCount] = await Promise.all([
          this.brandService.search(name, paginationParams),
          this.brandService.countSearchResults(name, filter),
        ]);
      } else {
        // Otherwise use filter
        [brands, totalCount] = await Promise.all([
          this.brandService.filterBy(filter, paginationParams),
          this.brandService.countBrands(filter),
        ]);
      }

      return {
        items: brands,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to search brands: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => Brand, { name: 'Brand' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Brand ID is required');
      }

      const brand = await this.brandService.findOne({ id });
      if (!brand) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }

      return brand.dataValues;
    } catch (error) {
      this.logger.error(`Failed to find brand: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Mutation(() => Brand)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async updateBrand(
    @Args('updateBrandInput') updateBrandInput: UpdateBrandInput,
    @CurrentUser() user: User,
  ) {
    try {
      if (!updateBrandInput.id) {
        throw new BadRequestException('Brand ID is required for update');
      }
      // Check if user has permission to update this brand
      const brand = await this.brandService.findOne({
        id: updateBrandInput.id,
      });

      if (user.role !== UserRole.ADMIN && brand.shopId !== user.shopId) {
        throw new ForbiddenException(
          'You can only update brands from your own shop',
        );
      }

      const data = await this.brandService.update(
        updateBrandInput.id,
        updateBrandInput,
      );

      return data.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to update brand: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Mutation(() => Brand)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async removeBrand(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ) {
    try {
      if (!id) {
        throw new BadRequestException('Brand ID is required');
      }

      // Check if user has permission to delete this brand
      const brand = await this.brandService.findOne({ id });

      if (user.role !== UserRole.ADMIN && brand.shopId !== user.shopId) {
        throw new ForbiddenException(
          'You can only delete brands from your own shop',
        );
      }

      const result = await this.brandService.remove(id);
      return result.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to remove brand: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => BrandResponse, { name: 'MyShopBrands' })
  @UseGuards(JwtAuthGuard)
  async getMyShopBrands(
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

      const [brands, totalCount] = await Promise.all([
        this.brandService.filterBy(filter, paginationParams),
        this.brandService.countBrands(filter),
      ]);

      return {
        items: brands,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch shop brands: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @ResolveField()
  async shops(@Parent() brand: Brand) {
    try {
      const { shopId } = brand;
      if (!shopId) return null;

      const shop = await this.shopService.findOne({ id: shopId });
      return shop ? shop.dataValues : null;
    } catch (error) {
      this.logger.error(
        `Failed to resolve shop: ${error.message}`,
        error.stack,
      );
      return null;
    }
  }

  @ResolveField()
  async products(@Parent() brand: Brand) {
    try {
      const { id } = brand;
      if (!id) return null;

      const product = await this.productService.filterBy({ brandId: id });
      return product ? product : null;
    } catch (error) {
      this.logger.error(
        `Failed to resolve product: ${error.message}`,
        error.stack,
      );
      return null;
    }
  }
}
