import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { WhereOptions, Op, FindOptions } from 'sequelize';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private CategorysRepository: typeof Category,
    private TagsRepository: typeof Tag,
  ) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    try {
      return await this.CategorysRepository.create(
        {
          ...createCategoryInput,
        },
        { raw: true },
      );
    } catch (error) {
      this.logger.error(
        `Failed to create category: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(pagination?: PaginationArgs): Promise<Category[]> {
    try {
      const options: FindOptions = { raw: true };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        // options.category = [['createdAt', 'DESC']];
      }

      return await this.CategorysRepository.findAll<Category>(options);
    } catch (error) {
      this.logger.error(
        `Failed to fetch categorys: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async filterBy(
    search: WhereOptions<any>,
    pagination?: PaginationArgs,
    sortOptions?: { sortBy?: string; sortCategory?: 'ASC' | 'DESC' },
  ): Promise<Category[]> {
    try {
      const options: FindOptions = {
        where: search,
        raw: true,
      };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        // options.category = [['createdAt', 'DESC']];
      }
      // Apply sorting if provided
      // if (sortOptions && sortOptions.sortBy) {
      (sortOptions && sortOptions.sortCategory) || 'ASC';
      //   options.category = [[sortOptions.sortBy, category]];
      // } else {
      //   options.category = [['createdAt', 'DESC']];
      // }

      return await this.CategorysRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to filter categorys: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async search(term: string, pagination?: PaginationArgs): Promise<Category[]> {
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
        // options.category = [['createdAt', 'DESC']];
      }

      return await this.CategorysRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to search categorys: ${error.message}`,
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

      return await this.CategorysRepository.count({
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

  async findOne(search: WhereOptions<any>): Promise<Category> {
    try {
      const category = await this.CategorysRepository.findOne<Category>({
        where: search,
      });

      if (!category) {
        throw new NotFoundException(`Category not found`);
      }

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to find category: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(id: string, data: UpdateCategoryInput): Promise<Category> {
    try {
      const category = await this.CategorysRepository.findOne({
        where: { id },
      });

      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      await category.update({ ...data });
      await category.save();

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to update category: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string): Promise<Category> {
    try {
      const category = await this.CategorysRepository.findOne<Category>({
        where: { id },
      });

      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      await category.destroy();
      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to remove category: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async countCategorys(filter?: WhereOptions<any>): Promise<number> {
    try {
      return await this.CategorysRepository.count({
        where: filter || {},
      });
    } catch (error) {
      this.logger.error(
        `Failed to count categorys: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}

// import { Inject, Injectable } from '@nestjs/common';
// import { CreateCategoryInput } from './dto/create-category.input';
// import { UpdateCategoryInput } from './dto/update-category.input';
// import { Category } from './entities/category.entity';

// @Injectable()
// export class CategoryService {
//   constructor(
//     @Inject('CATEGORY_REPOSITORY')
//     private categoryRepository: typeof Category,
//   ) {}

//   async create(createCatgeoriesInput: CreateCategoryInput): Promise<Category> {
//     return await this.categoryRepository.create({
//       ...createCatgeoriesInput,
//     });
//   }

//   async findAll(): Promise<Category[]> {
//     return await this.categoryRepository.findAll<Category>({ raw: true });
//   }

//   async findOne(search: any): Promise<Category> {
//     const category = await this.categoryRepository.findOne<Category>({
//       where: search,
//     });
//     if (!category) {
//       throw new Error();
//     }
//     return category;
//   }

//   async update(id: string, data: UpdateCategoryInput): Promise<Category> {
//     const Category = await this.categoryRepository.findOne({
//       where: { id: id },
//     });
//     if (!Category) {
//       throw new Error('Category not found');
//     }
//     await Category.update({ ...data });
//     await Category.save();
//     return Category;
//   }

//   async remove(id: string): Promise<Category> {
//     const category = await this.categoryRepository.findOne<Category>({
//       where: { id: id },
//     });
//     if (!category) {
//       throw new Error();
//     }
//     await category.destroy();
//     return category;
//   }
// }
