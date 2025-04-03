import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag } from './entities/tag.entity';
import { AttributeService } from 'src/attribute/attribute.service';
import { CategoryService } from 'src/category/category.service';
import { VariantService } from 'src/variant/variant.service';
import { ShopService } from 'src/shop/shop.service';
import { BrandService } from 'src/brand/brand.service';
import { ImageService } from 'src/image/image.service';
import { TagService } from 'src/tag/tag.service';
import { TagResponse } from './dto/tag-response.dto';
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
import { SearchTagInput } from './dto/search-tag.input';

@Resolver(() => Tag)
export class TagResolver {
  private readonly logger = new Logger(TagResolver.name);

  constructor(private readonly tagService: TagService) {}

  @Mutation(() => TagResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async createTag(
    @Args('createTagInput') createTagInput: CreateTagInput,
    @CurrentUser() user: User,
  ) {
    try {
      // Validate input data
      this.logger.error(
        `user ${user.id} with shopId: ${user.shopId} is trying to create tag: ${createTagInput.name}`,
      );

      if (!createTagInput.name) {
        throw new BadRequestException('Tag name is required');
      }

      // Verify user has permission to create tag for this shop
      if (user.role !== UserRole.SELLER || !user.id) {
        throw new ForbiddenException(
          'You can only create tags for your own user',
        );
      }

      const tag = await this.tagService.create(createTagInput);
      return {
        success: true,
        message: 'Tag created successfully',
        tag: tag.dataValues,
      };
    } catch (error) {
      this.logger.error(`Failed to create tag: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Query(() => TagResponse, { name: 'Tags' })
  async findAll(
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Use Promise.all for parallel execution
      const [tags, totalCount] = await Promise.all([
        this.tagService.findAll(paginationParams),
        this.tagService.countTags(),
      ]);

      return {
        items: tags,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(`Failed to fetch tags: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Query(() => TagResponse, { name: 'SearchTags' })
  async searchTags(
    @Args('searchInput') searchInput: SearchTagInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      const { term, categoryId, brandId, minPrice, maxPrice } = searchInput;

      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Build filter criteria
      const filter: any = {};

      if (categoryId) filter.categoryId = categoryId;
      if (brandId) filter.brandId = brandId;

      if (minPrice !== undefined || maxPrice !== undefined) {
        filter.price = {};
        if (minPrice !== undefined) filter.price[Op.gte] = minPrice;
        if (maxPrice !== undefined) filter.price[Op.lte] = maxPrice;
      }

      let tags;
      let totalCount;

      if (term) {
        // If term is provided, use search functionality
        [tags, totalCount] = await Promise.all([
          this.tagService.search(term, paginationParams),
          this.tagService.countSearchResults(term, filter),
        ]);
      } else {
        // Otherwise use filter
        [tags, totalCount] = await Promise.all([
          this.tagService.filterBy(filter, paginationParams),
          this.tagService.countTags(filter),
        ]);
      }

      return {
        items: tags,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(`Failed to search tags: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Query(() => Tag, { name: 'Tag' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Tag ID is required');
      }

      const tag = await this.tagService.findOne({ id });
      if (!tag) {
        throw new NotFoundException(`Tag with ID ${id} not found`);
      }

      return tag.dataValues;
    } catch (error) {
      this.logger.error(`Failed to find tag: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Mutation(() => Tag)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async updateTag(
    @Args('updateTagInput') updateTagInput: UpdateTagInput,
    @CurrentUser() user: User,
  ) {
    try {
      if (!updateTagInput.id) {
        throw new BadRequestException('Tag ID is required for update');
      }

      // Add validation for required fields
      if (updateTagInput.name && updateTagInput.productId) {
        throw new BadRequestException('Price must be greater than zero');
      }

      // Check if user has permission to update this tag
      const tag = await this.tagService.findOne({
        id: updateTagInput.id,
      });

      if (user.role !== UserRole.ADMIN && tag.userId !== user.id) {
        throw new ForbiddenException(
          'You can only update tags from your own shop',
        );
      }

      const data = await this.tagService.update(
        updateTagInput.id,
        updateTagInput,
      );

      return data.dataValues;
    } catch (error) {
      this.logger.error(`Failed to update tag: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Mutation(() => Tag)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async removeTag(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ) {
    try {
      if (!id) {
        throw new BadRequestException('Tag ID is required');
      }

      // Check if user has permission to delete this tag
      const tag = await this.tagService.findOne({ id });

      if (user.role !== UserRole.ADMIN && tag.userId !== user.id) {
        throw new ForbiddenException(
          'You can only delete tags from your own shop',
        );
      }

      const result = await this.tagService.remove(id);
      return result.dataValues;
    } catch (error) {
      this.logger.error(`Failed to remove tag: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Query(() => TagResponse, { name: 'MyShopTags' })
  @UseGuards(JwtAuthGuard)
  async getMyShopTags(
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

      const [tags, totalCount] = await Promise.all([
        this.tagService.filterBy(filter, paginationParams),
        this.tagService.countTags(filter),
      ]);

      return {
        items: tags,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch shop tags: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  // ResolveField methods remain the same
  // @ResolveField()
  // async attributes(@Parent() tag: Tag) {
  //   try {
  //     const { id } = tag;
  //     const attribute = await this.attributeService.findOne({ tagId: id });
  //     return attribute ? attribute.dataValues : null;
  //   } catch (error) {
  //     this.logger.error(
  //       `Failed to resolve attributes: ${error.message}`,
  //       error.stack,
  //     );
  //     return null;
  //   }
  // }

  // @ResolveField()
  // async categorys(@Parent() tag: Tag) {
  //   try {
  //     const { categoryId } = tag;
  //     if (!categoryId) return null;

  //     const category = await this.categoryService.findOne({ id: categoryId });
  //     return category ? category.dataValues : null;
  //   } catch (error) {
  //     this.logger.error(
  //       `Failed to resolve category: ${error.message}`,
  //       error.stack,
  //     );
  //     return null;
  //   }
  // }
}
