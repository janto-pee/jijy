import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
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
import { CategoryResponse } from './dto/category-response.dto';
import { SearchCategoryInput } from './dto/search-category.input';
import { UserService } from 'src/user/user.service';

@Resolver(() => Category)
export class CategoryResolver {
  private readonly logger = new Logger(CategoryResolver.name);

  constructor(
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @CurrentUser() user: User,
  ) {
    try {
      // Validate input data
      this.logger.error(
        `user ${user.id} is trying to create category: ${createCategoryInput.name}`,
      );
      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException('Only admin can create category');
      }

      // Verify user has permission to create category for this shop
      if (!user) {
        throw new ForbiddenException(
          'only registered users can create category',
        );
      }

      const category = await this.categoryService.create(createCategoryInput);
      return {
        success: true,
        message: 'Category created successfully',
        category: category.dataValues,
      };
    } catch (error) {
      this.logger.error(
        `Failed to create category: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => CategoryResponse, { name: 'Categorys' })
  async findAll(
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Use Promise.all for parallel execution
      const [categorys, totalCount] = await Promise.all([
        this.categoryService.findAll(paginationParams),
        this.categoryService.countCategorys(),
      ]);

      return {
        items: categorys,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch categorys: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => CategoryResponse, { name: 'SearchCategorys' })
  async searchCategorys(
    @Args('searchInput') searchInput: SearchCategoryInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      const { name } = searchInput;

      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Build filter criteria
      const filter: any = {};

      let categorys;
      let totalCount;

      if (name) {
        // If name is provided, use search functionality
        [categorys, totalCount] = await Promise.all([
          this.categoryService.search(name, paginationParams),
          this.categoryService.countSearchResults(name, filter),
        ]);
      } else {
        // Otherwise use filter
        [categorys, totalCount] = await Promise.all([
          this.categoryService.filterBy(filter, paginationParams),
          this.categoryService.countCategorys(filter),
        ]);
      }

      return {
        items: categorys,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to search categorys: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => Category, { name: 'Category' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Category ID is required');
      }

      const category = await this.categoryService.findOne({ id });
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      return category.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to find category: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
    @CurrentUser() user: User,
  ) {
    try {
      if (!updateCategoryInput.id) {
        throw new BadRequestException('Category ID is required for update');
      }
      // Check if user has permission to update this category
      const category = await this.categoryService.findOne({
        id: updateCategoryInput.id,
      });

      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException('Only admin can update category');
      }

      const data = await this.categoryService.update(
        updateCategoryInput.id,
        updateCategoryInput,
      );

      return data.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to update category: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async removeCategory(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ) {
    try {
      if (!id) {
        throw new BadRequestException('Category ID is required');
      }

      // Check if user has permission to delete this category
      const category = await this.categoryService.findOne({ id });

      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException('Only admin can create category');
      }

      const result = await this.categoryService.remove(id);
      return result.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to remove category: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => CategoryResponse, { name: 'MyShopCategorys' })
  @UseGuards(JwtAuthGuard)
  async getMyShopCategorys(
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

      const [categorys, totalCount] = await Promise.all([
        this.categoryService.filterBy(filter, paginationParams),
        this.categoryService.countCategorys(filter),
      ]);

      return {
        items: categorys,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch shop categorys: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  // @ResolveField()
  // async user(@Parent() category: Category) {
  //   try {
  //     const { userId } = category;
  //     if (!userId) return null;

  //     const user = await this.userService.findOne({ id: userId });
  //     return user ? user.dataValues : null;
  //   } catch (error) {
  //     this.logger.error(
  //       `Failed to resolve user: ${error.message}`,
  //       error.stack,
  //     );
  //     return null;
  //   }
  // }
}
