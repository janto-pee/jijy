import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { AttributeService } from 'src/attribute/attribute.service';
import { CategoryService } from 'src/category/category.service';
import { VariantService } from 'src/variant/variant.service';
import { ShopService } from 'src/shop/shop.service';
import { BrandService } from 'src/brand/brand.service';
import { ImageService } from 'src/image/image.service';
import { TagService } from 'src/tag/tag.service';
import { ProductsResponse } from './dto/product-reponse.dto';
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
import { SearchProductInput } from './dto/search-product.input';

@Resolver(() => Product)
export class ProductResolver {
  private readonly logger = new Logger(ProductResolver.name);

  constructor(
    private readonly productService: ProductService,
    private readonly attributeService: AttributeService,
    private readonly categoryService: CategoryService,
    private readonly variantService: VariantService,
    private readonly shopService: ShopService,
    private readonly brandService: BrandService,
    private readonly imageService: ImageService,
    private readonly tagService: TagService,
  ) {}

  @Mutation(() => ProductsResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @CurrentUser() user: User,
  ) {
    try {
      // Validate input data
      this.logger.error(
        `user ${user.id} with shopId: ${user.shopId} is trying to create product: ${createProductInput.name}`,
      );

      if (!createProductInput.name || !createProductInput.price) {
        throw new BadRequestException('Product name and price are required');
      }

      // Add user context
      if (user.shopId) {
        createProductInput.shopId = createProductInput.shopId || user.shopId;
      }

      // Verify user has permission to create product for this shop
      if (
        user.role !== UserRole.ADMIN &&
        createProductInput.shopId !== user.shopId
      ) {
        throw new ForbiddenException(
          'You can only create products for your own shop',
        );
      }

      const product = await this.productService.create(createProductInput);
      return {
        success: true,
        message: 'Product created successfully',
        product: product.dataValues,
      };
    } catch (error) {
      this.logger.error(
        `Failed to create product: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => ProductsResponse, { name: 'Products' })
  async findAll(
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Use Promise.all for parallel execution
      const [products, totalCount] = await Promise.all([
        this.productService.findAll(paginationParams),
        this.productService.countProducts(),
      ]);

      return {
        items: products,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch products: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => ProductsResponse, { name: 'SearchProducts' })
  async searchProducts(
    @Args('searchInput') searchInput: SearchProductInput,
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

      let products;
      let totalCount;

      if (term) {
        // If term is provided, use search functionality
        [products, totalCount] = await Promise.all([
          this.productService.search(term, paginationParams),
          this.productService.countSearchResults(term, filter),
        ]);
      } else {
        // Otherwise use filter
        [products, totalCount] = await Promise.all([
          this.productService.filterBy(filter, paginationParams),
          this.productService.countProducts(filter),
        ]);
      }

      return {
        items: products,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to search products: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => Product, { name: 'Product' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Product ID is required');
      }

      const product = await this.productService.findOne({ id });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return product.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to find product: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
    @CurrentUser() user: User,
  ) {
    try {
      if (!updateProductInput.id) {
        throw new BadRequestException('Product ID is required for update');
      }

      // Add validation for required fields
      if (updateProductInput.price && updateProductInput.price <= 0) {
        throw new BadRequestException('Price must be greater than zero');
      }

      // Check if user has permission to update this product
      const product = await this.productService.findOne({
        id: updateProductInput.id,
      });

      if (user.role !== UserRole.ADMIN && product.shopId !== user.shopId) {
        throw new ForbiddenException(
          'You can only update products from your own shop',
        );
      }

      const data = await this.productService.update(
        updateProductInput.id,
        updateProductInput,
      );

      return data.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to update product: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async removeProduct(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ) {
    try {
      if (!id) {
        throw new BadRequestException('Product ID is required');
      }

      // Check if user has permission to delete this product
      const product = await this.productService.findOne({ id });

      if (user.role !== UserRole.ADMIN && product.shopId !== user.shopId) {
        throw new ForbiddenException(
          'You can only delete products from your own shop',
        );
      }

      const result = await this.productService.remove(id);
      return result.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to remove product: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => ProductsResponse, { name: 'MyShopProducts' })
  @UseGuards(JwtAuthGuard)
  async getMyShopProducts(
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

      const [products, totalCount] = await Promise.all([
        this.productService.filterBy(filter, paginationParams),
        this.productService.countProducts(filter),
      ]);

      return {
        items: products,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch shop products: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  // ResolveField methods remain the same
  @ResolveField()
  async attributes(@Parent() product: Product) {
    try {
      const { id } = product;
      const attribute = await this.attributeService.findOne({ productId: id });
      return attribute ? attribute.dataValues : null;
    } catch (error) {
      this.logger.error(
        `Failed to resolve attributes: ${error.message}`,
        error.stack,
      );
      return null;
    }
  }

  @ResolveField()
  async categorys(@Parent() product: Product) {
    try {
      const { categoryId } = product;
      if (!categoryId) return null;

      const category = await this.categoryService.findOne({ id: categoryId });
      return category ? category.dataValues : null;
    } catch (error) {
      this.logger.error(
        `Failed to resolve category: ${error.message}`,
        error.stack,
      );
      return null;
    }
  }

  @ResolveField()
  async variants(@Parent() product: Product) {
    try {
      const { variantId } = product;
      if (!variantId) return null;

      const variant = await this.variantService.findOne({ id: variantId });
      return variant ? variant.dataValues : null;
    } catch (error) {
      this.logger.error(
        `Failed to resolve variant: ${error.message}`,
        error.stack,
      );
      return null;
    }
  }

  @ResolveField()
  async shop(@Parent() product: Product) {
    try {
      const { shopId } = product;
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
  async brands(@Parent() product: Product) {
    try {
      const { brandId } = product;
      if (!brandId) return null;

      const brand = await this.brandService.findOne({ id: brandId });
      return brand ? brand.dataValues : null;
    } catch (error) {
      this.logger.error(
        `Failed to resolve brand: ${error.message}`,
        error.stack,
      );
      return null;
    }
  }

  @ResolveField()
  async image(@Parent() product: Product) {
    try {
      const { id } = product;
      return await this.imageService.filterBy({ productId: id });
    } catch (error) {
      this.logger.error(
        `Failed to resolve images: ${error.message}`,
        error.stack,
      );
      return [];
    }
  }

  @ResolveField()
  async tag(@Parent() product: Product) {
    try {
      const { id } = product;
      return await this.tagService.filterBy({ productId: id });
    } catch (error) {
      this.logger.error(
        `Failed to resolve tags: ${error.message}`,
        error.stack,
      );
      return [];
    }
  }
}
