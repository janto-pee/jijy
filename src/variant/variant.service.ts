import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateVariantInput } from './dto/create-variant.input';
import { UpdateVariantInput } from './dto/update-variant.input';
import { Variant } from './entities/variant.entity';
import { WhereOptions, Op, FindOptions } from 'sequelize';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class VariantService {
  private readonly logger = new Logger(VariantService.name);

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private VariantsRepository: typeof Variant,
    private TagsRepository: typeof Tag,
  ) {}

  async create(createVariantInput: CreateVariantInput): Promise<Variant> {
    try {
      return await this.VariantsRepository.create(
        {
          ...createVariantInput,
        },
        { raw: true },
      );
    } catch (error) {
      this.logger.error(
        `Failed to create variant: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(pagination?: PaginationArgs): Promise<Variant[]> {
    try {
      const options: FindOptions = { raw: true };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        // options.variant = [['createdAt', 'DESC']];
      }

      return await this.VariantsRepository.findAll<Variant>(options);
    } catch (error) {
      this.logger.error(
        `Failed to fetch variants: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async filterBy(
    search: WhereOptions<any>,
    pagination?: PaginationArgs,
    sortOptions?: { sortBy?: string; sortVariant?: 'ASC' | 'DESC' },
  ): Promise<Variant[]> {
    try {
      const options: FindOptions = {
        where: search,
        raw: true,
      };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        // options.variant = [['createdAt', 'DESC']];
      }
      // Apply sorting if provided
      // if (sortOptions && sortOptions.sortBy) {
      (sortOptions && sortOptions.sortVariant) || 'ASC';
      //   options.variant = [[sortOptions.sortBy, variant]];
      // } else {
      //   options.variant = [['createdAt', 'DESC']];
      // }

      return await this.VariantsRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to filter variants: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async search(term: string, pagination?: PaginationArgs): Promise<Variant[]> {
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
        // options.variant = [['createdAt', 'DESC']];
      }

      return await this.VariantsRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to search variants: ${error.message}`,
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

      return await this.VariantsRepository.count({
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

  async findOne(search: WhereOptions<any>): Promise<Variant> {
    try {
      const variant = await this.VariantsRepository.findOne<Variant>({
        where: search,
      });

      if (!variant) {
        throw new NotFoundException(`Variant not found`);
      }

      return variant;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to find variant: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(id: string, data: UpdateVariantInput): Promise<Variant> {
    try {
      const variant = await this.VariantsRepository.findOne({
        where: { id },
      });

      if (!variant) {
        throw new NotFoundException(`Variant with ID ${id} not found`);
      }

      await variant.update({ ...data });
      await variant.save();

      return variant;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to update variant: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string): Promise<Variant> {
    try {
      const variant = await this.VariantsRepository.findOne<Variant>({
        where: { id },
      });

      if (!variant) {
        throw new NotFoundException(`Variant with ID ${id} not found`);
      }

      await variant.destroy();
      return variant;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to remove variant: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async countVariants(filter?: WhereOptions<any>): Promise<number> {
    try {
      return await this.VariantsRepository.count({
        where: filter || {},
      });
    } catch (error) {
      this.logger.error(
        `Failed to count variants: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}

// import { Inject, Injectable } from '@nestjs/common';
// import { CreateVariantInput } from './dto/create-variant.input';
// import { UpdateVariantInput } from './dto/update-variant.input';
// import { Variant } from './entities/variant.entity';
// import { WhereOptions } from 'sequelize';

// @Injectable()
// export class VariantService {
//   constructor(
//     @Inject('VARIANT_REPOSITORY')
//     private VariantsRepository: typeof Variant,
//   ) {}
//   async create(createVariantInput: CreateVariantInput): Promise<Variant> {
//     return await this.VariantsRepository.create({
//       ...createVariantInput,
//     });
//   }

//   async findAll(): Promise<Variant[]> {
//     return await this.VariantsRepository.findAll<Variant>({ raw: true });
//   }

//   async findOne(search: WhereOptions<any>): Promise<Variant> {
//     const variant = await this.VariantsRepository.findOne<Variant>({
//       where: search,
//     });
//     if (!variant) {
//       throw new Error('variant not found');
//     }
//     return variant;
//   }

//   async findEmail(email: string): Promise<Variant> {
//     const variant = await this.VariantsRepository.findOne<Variant>({
//       where: { email: email },
//     });
//     if (!variant) {
//       throw new Error('variant not found');
//     }
//     return variant;
//   }

//   async update(id: string, data: UpdateVariantInput): Promise<Variant> {
//     const Variant = await this.VariantsRepository.findOne({
//       where: { id: id },
//     });
//     if (!Variant) {
//       throw new Error('variants not found');
//     }
//     await Variant.update({ ...data });
//     await Variant.save();
//     return Variant;
//   }

//   async remove(id: string): Promise<Variant> {
//     const variant = await this.VariantsRepository.findOne<Variant>({
//       where: { id: id },
//     });
//     if (!variant) {
//       throw new Error('variant not found');
//     }
//     await variant.destroy();
//     return variant;
//   }
// }
