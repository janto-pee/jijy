import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { WhereOptions, Op, FindOptions } from 'sequelize';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private ProductsRepository: typeof Product,
    private TagsRepository: typeof Tag,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    try {
      return await this.ProductsRepository.create(
        {
          ...createProductInput,
        },
        { raw: true },
      );
    } catch (error) {
      this.logger.error(
        `Failed to create product: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(pagination?: PaginationArgs): Promise<Product[]> {
    try {
      const options: FindOptions = { raw: true };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        // options.product = [['createdAt', 'DESC']];
      }

      return await this.ProductsRepository.findAll<Product>(options);
    } catch (error) {
      this.logger.error(
        `Failed to fetch products: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async filterBy(
    search: WhereOptions<any>,
    pagination?: PaginationArgs,
    sortOptions?: { sortBy?: string; sortProduct?: 'ASC' | 'DESC' },
  ): Promise<Product[]> {
    try {
      const options: FindOptions = {
        where: search,
        raw: true,
      };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        // options.product = [['createdAt', 'DESC']];
      }
      // Apply sorting if provided
      // if (sortOptions && sortOptions.sortBy) {
      (sortOptions && sortOptions.sortProduct) || 'ASC';
      //   options.product = [[sortOptions.sortBy, product]];
      // } else {
      //   options.product = [['createdAt', 'DESC']];
      // }

      return await this.ProductsRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to filter products: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async search(term: string, pagination?: PaginationArgs): Promise<Product[]> {
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
        // options.product = [['createdAt', 'DESC']];
      }

      return await this.ProductsRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to search products: ${error.message}`,
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

      return await this.ProductsRepository.count({
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

  async findOne(search: WhereOptions<any>): Promise<Product> {
    try {
      const product = await this.ProductsRepository.findOne<Product>({
        where: search,
      });

      if (!product) {
        throw new NotFoundException(`Product not found`);
      }

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to find product: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(id: string, data: UpdateProductInput): Promise<Product> {
    try {
      const product = await this.ProductsRepository.findOne({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      await product.update({ ...data });
      await product.save();

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to update product: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      const product = await this.ProductsRepository.findOne<Product>({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      await product.destroy();
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to remove product: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async countProducts(filter?: WhereOptions<any>): Promise<number> {
    try {
      return await this.ProductsRepository.count({
        where: filter || {},
      });
    } catch (error) {
      this.logger.error(
        `Failed to count products: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}

// import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
// import { CreateProductInput } from './dto/create-product.input';
// import { UpdateProductInput } from './dto/update-product.input';
// import { Product } from './entities/product.entity';
// import { WhereOptions, Op, FindOptions } from 'sequelize';
// import { PaginationArgs } from 'src/common/dto/pagination.dto';
// import { Tag } from 'src/tag/entities/tag.entity';

// @Injectable()
// export class ProductService {
//   private readonly logger = new Logger(ProductService.name);

//   constructor(
//     @Inject('PRODUCT_REPOSITORY')
//     private ProductsRepository: typeof Product,
//     private TagsRepository: typeof Tag,
//   ) {}

//   async create(createProductInput: CreateProductInput): Promise<Product> {
//     try {
//       return await this.ProductsRepository.create(
//         {
//           ...createProductInput,
//         },
//         { raw: true },
//       );
//     } catch (error) {
//       this.logger.error(
//         `Failed to create product: ${error.message}`,
//         error.stack,
//       );
//       throw error;
//     }
//   }

//   async findAll(pagination?: PaginationArgs): Promise<Product[]> {
//     try {
//       const options: FindOptions = { raw: true };

//       if (pagination) {
//         const { limit, offset } = pagination;
//         options.limit = limit;
//         options.offset = offset;
//         options.order = [['createdAt', 'DESC']];
//       }

//       return await this.ProductsRepository.findAll<Product>(options);
//     } catch (error) {
//       this.logger.error(
//         `Failed to fetch products: ${error.message}`,
//         error.stack,
//       );
//       throw error;
//     }
//   }

//   async filterBy(
//     search: WhereOptions<any>,
//     pagination?: PaginationArgs,
//     sortOptions?: { sortBy?: string; sortOrder?: 'ASC' | 'DESC' },
//   ): Promise<Product[]> {
//     try {
//       const options: FindOptions = {
//         where: search,
//         raw: true,
//       };

//       if (pagination) {
//         const { limit, offset } = pagination;
//         options.limit = limit;
//         options.offset = offset;
//         options.order = [['createdAt', 'DESC']];
//       }
//       // Apply sorting if provided
//       if (sortOptions && sortOptions.sortBy) {
//         const order = sortOptions.sortOrder || 'ASC';
//         options.order = [[sortOptions.sortBy, order]];
//       } else {
//         options.order = [['createdAt', 'DESC']];
//       }

//       return await this.ProductsRepository.findAll(options);
//     } catch (error) {
//       this.logger.error(
//         `Failed to filter products: ${error.message}`,
//         error.stack,
//       );
//       throw error;
//     }
//   }
//   // async search(
//   //   searchInput: SearchProductInput,
//   //   pagination?: PaginationArgs,
//   // ): Promise<Product[]> {
//   //   try {
//   //     const {
//   //       term,
//   //       categoryId,
//   //       brandId,
//   //       minPrice,
//   //       maxPrice,
//   //       shopId,
//   //       inStock,
//   //       tags,
//   //       sortBy,
//   //       sortOrder,
//   //     } = searchInput;

//   //     // Build the where condition
//   //     const whereConditions: any = {};

//   //     // Add term search if provided
//   //     if (term) {
//   //       whereConditions[Op.or] = [
//   //         { name: { [Op.iLike]: `%${term}%` } },
//   //         { description: { [Op.iLike]: `%${term}%` } },
//   //         { parentSku: { [Op.iLike]: `%${term}%` } },
//   //         { sellerSku: { [Op.iLike]: `%${term}%` } },
//   //       ];
//   //     }

//   //     // Add filters
//   //     if (categoryId) whereConditions.categoryId = categoryId;
//   //     if (brandId) whereConditions.brandId = brandId;
//   //     if (shopId) whereConditions.shopId = shopId;

//   //     // Add price range filter
//   //     if (minPrice !== undefined || maxPrice !== undefined) {
//   //       whereConditions.price = {};
//   //       if (minPrice !== undefined) whereConditions.price[Op.gte] = minPrice;
//   //       if (maxPrice !== undefined) whereConditions.price[Op.lte] = maxPrice;
//   //     }

//   //     // Add stock filter
//   //     if (inStock !== undefined) {
//   //       whereConditions.stock = inStock ? { [Op.gt]: 0 } : { [Op.eq]: 0 };
//   //     }

//   //     // Build the options
//   //     const options: FindOptions = {
//   //       where: whereConditions,
//   //       raw: true,
//   //     };

//   //     // Add pagination
//   //     if (pagination) {
//   //       const { limit, offset } = pagination;
//   //       options.limit = limit;
//   //       options.offset = offset;
//   //     }

//   //     // Add sorting
//   //     if (sortBy) {
//   //       options.order = [[sortBy, sortOrder || 'ASC']];
//   //     } else {
//   //       options.order = [['createdAt', 'DESC']];
//   //     }

//   //     // Include tags if needed for filtering
//   //     if (tags && tags.length > 0) {
//   //       // This requires a more complex query with associations
//   //       // For simplicity, we'll filter in memory after fetching
//   //       const products = await this.ProductsRepository.findAll(options);

//   //       // Filter products with matching tags
//   //       // This is a simplified approach - in a real app, you'd use proper joins
//   //       if (tags.length > 0) {
//   //         // const tagService = new TagService(); // You'd inject this properly
//   //         const tagService = new TagService(Tag); // You'd inject this properly
//   //         const productsWithTags = [];

//   //         for (const product of products) {
//   //           const productTags = await tagService.filterBy({
//   //             productId: product.id,
//   //           });
//   //           const tagNames = productTags.map((tag) => tag.name);

//   //           // Check if product has any of the requested tags
//   //           if (tags.some((tag) => tagNames.includes(tag))) {
//   //             // productsWithTags.push(product);
//   //             productsWithTags.push();
//   //           }
//   //         }

//   //         return productsWithTags;
//   //       }

//   //       return products;
//   //     }

//   //     return await this.ProductsRepository.findAll(options);
//   //   } catch (error) {
//   //     this.logger.error(
//   //       `Failed to search products: ${error.message}`,
//   //       error.stack,
//   //     );
//   //     throw error;
//   //   }
//   // }

//   // async countSearchResults(searchInput: SearchProductInput): Promise<number> {
//   //   try {
//   //     const { term, categoryId, brandId, minPrice, maxPrice, shopId, inStock } =
//   //       searchInput;

//   //     // Build the where condition
//   //     const whereConditions: any = {};

//   //     // Add term search if provided
//   //     if (term) {
//   //       whereConditions[Op.or] = [
//   //         { name: { [Op.iLike]: `%${term}%` } },
//   //         { description: { [Op.iLike]: `%${term}%` } },
//   //         { parentSku: { [Op.iLike]: `%${term}%` } },
//   //         { sellerSku: { [Op.iLike]: `%${term}%` } },
//   //       ];
//   //     }

//   //     // Add filters
//   //     if (categoryId) whereConditions.categoryId = categoryId;
//   //     if (brandId) whereConditions.brandId = brandId;
//   //     if (shopId) whereConditions.shopId = shopId;

//   //     // Add price range filter
//   //     if (minPrice !== undefined || maxPrice !== undefined) {
//   //       whereConditions.price = {};
//   //       if (minPrice !== undefined) whereConditions.price[Op.gte] = minPrice;
//   //       if (maxPrice !== undefined) whereConditions.price[Op.lte] = maxPrice;
//   //     }

//   //     // Add stock filter
//   //     if (inStock !== undefined) {
//   //       whereConditions.stock = inStock ? { [Op.gt]: 0 } : { [Op.eq]: 0 };
//   //     }

//   //     return await this.ProductsRepository.count({
//   //       where: whereConditions,
//   //     });
//   //   } catch (error) {
//   //     this.logger.error(
//   //       `Failed to count search results: ${error.message}`,
//   //       error.stack,
//   //     );
//   //     throw error;
//   //   }
//   // }

//   async search(term: string, pagination?: PaginationArgs): Promise<Product[]> {
//     try {
//       const options: FindOptions = {
//         where: {
//           [Op.or]: [
//             { name: { [Op.iLike]: `%${term}%` } },
//             { description: { [Op.iLike]: `%${term}%` } },
//             { parentSku: { [Op.iLike]: `%${term}%` } },
//             { sellerSku: { [Op.iLike]: `%${term}%` } },
//           ],
//         },
//         raw: true,
//       };

//       if (pagination) {
//         const { limit, offset } = pagination;
//         options.limit = limit;
//         options.offset = offset;
//         options.order = [['createdAt', 'DESC']];
//       }

//       return await this.ProductsRepository.findAll(options);
//     } catch (error) {
//       this.logger.error(
//         `Failed to search products: ${error.message}`,
//         error.stack,
//       );
//       throw error;
//     }
//   }

//   async countSearchResults(
//     term: string,
//     additionalFilters: WhereOptions<any> = {},
//   ): Promise<number> {
//     try {
//       const searchCondition = {
//         [Op.or]: [
//           { name: { [Op.iLike]: `%${term}%` } },
//           { description: { [Op.iLike]: `%${term}%` } },
//           { parentSku: { [Op.iLike]: `%${term}%` } },
//           { sellerSku: { [Op.iLike]: `%${term}%` } },
//         ],
//       };

//       // Combine search condition with additional filters
//       const whereCondition = { ...searchCondition };

//       // Add additional filters if they exist
//       if (Object.keys(additionalFilters).length > 0) {
//         whereCondition[Op.and] = [whereCondition[Op.or], additionalFilters];
//         // delete whereCondition[Op.or]; ---------------------revisit
//       }

//       return await this.ProductsRepository.count({
//         where: whereCondition,
//       });
//     } catch (error) {
//       this.logger.error(
//         `Failed to count search results: ${error.message}`,
//         error.stack,
//       );
//       throw error;
//     }
//   }

//   async findOne(search: WhereOptions<any>): Promise<Product> {
//     try {
//       const product = await this.ProductsRepository.findOne<Product>({
//         where: search,
//       });

//       if (!product) {
//         throw new NotFoundException(`Product not found`);
//       }

//       return product;
//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       this.logger.error(
//         `Failed to find product: ${error.message}`,
//         error.stack,
//       );
//       throw error;
//     }
//   }

//   async update(id: string, data: UpdateProductInput): Promise<Product> {
//     try {
//       const product = await this.ProductsRepository.findOne({
//         where: { id },
//       });

//       if (!product) {
//         throw new NotFoundException(`Product with ID ${id} not found`);
//       }

//       await product.update({ ...data });
//       await product.save();

//       return product;
//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       this.logger.error(
//         `Failed to update product: ${error.message}`,
//         error.stack,
//       );
//       throw error;
//     }
//   }

//   async remove(id: string): Promise<Product> {
//     try {
//       const product = await this.ProductsRepository.findOne<Product>({
//         where: { id },
//       });

//       if (!product) {
//         throw new NotFoundException(`Product with ID ${id} not found`);
//       }

//       await product.destroy();
//       return product;
//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       this.logger.error(
//         `Failed to remove product: ${error.message}`,
//         error.stack,
//       );
//       throw error;
//     }
//   }

//   async countProducts(filter?: WhereOptions<any>): Promise<number> {
//     try {
//       return await this.ProductsRepository.count({
//         where: filter || {},
//       });
//     } catch (error) {
//       this.logger.error(
//         `Failed to count products: ${error.message}`,
//         error.stack,
//       );
//       throw error;
//     }
//   }
// }
