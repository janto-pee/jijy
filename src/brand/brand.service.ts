import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { Brand } from './entities/brand.entity';
import { WhereOptions, Op, FindOptions } from 'sequelize';
import { PaginationArgs } from 'src/common/dto/pagination.dto';

@Injectable()
export class BrandService {
  private readonly logger = new Logger(BrandService.name);

  constructor(
    @Inject('BRAND_REPOSITORY')
    private BrandsRepository: typeof Brand,
  ) {}

  async create(createBrandInput: CreateBrandInput): Promise<Brand> {
    try {
      return await this.BrandsRepository.create(
        {
          ...createBrandInput,
        },
        { raw: true },
      );
    } catch (error) {
      this.logger.error(
        `Failed to create brand: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(pagination?: PaginationArgs): Promise<Brand[]> {
    try {
      const options: FindOptions = { raw: true };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        // options.brand = [['createdAt', 'DESC']];
      }

      return await this.BrandsRepository.findAll<Brand>(options);
    } catch (error) {
      this.logger.error(
        `Failed to fetch brands: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async filterBy(
    search: WhereOptions<any>,
    pagination?: PaginationArgs,
    sortOptions?: { sortBy?: string; sortBrand?: 'ASC' | 'DESC' },
  ): Promise<Brand[]> {
    try {
      const options: FindOptions = {
        where: search,
        raw: true,
      };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        // options.brand = [['createdAt', 'DESC']];
      }
      // Apply sorting if provided
      // if (sortOptions && sortOptions.sortBy) {
      (sortOptions && sortOptions.sortBrand) || 'ASC';
      //   options.brand = [[sortOptions.sortBy, brand]];
      // } else {
      //   options.brand = [['createdAt', 'DESC']];
      // }

      return await this.BrandsRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to filter brands: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async search(term: string, pagination?: PaginationArgs): Promise<Brand[]> {
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
        // options.brand = [['createdAt', 'DESC']];
      }

      return await this.BrandsRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to search brands: ${error.message}`,
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

      return await this.BrandsRepository.count({
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

  async findOne(search: WhereOptions<any>): Promise<Brand> {
    try {
      const brand = await this.BrandsRepository.findOne<Brand>({
        where: search,
      });

      if (!brand) {
        throw new NotFoundException(`Brand not found`);
      }

      return brand;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to find brand: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, data: UpdateBrandInput): Promise<Brand> {
    try {
      const brand = await this.BrandsRepository.findOne({
        where: { id },
      });

      if (!brand) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }

      await brand.update({ ...data });
      await brand.save();

      return brand;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to update brand: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string): Promise<Brand> {
    try {
      const brand = await this.BrandsRepository.findOne<Brand>({
        where: { id },
      });

      if (!brand) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }

      await brand.destroy();
      return brand;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to remove brand: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async countBrands(filter?: WhereOptions<any>): Promise<number> {
    try {
      return await this.BrandsRepository.count({
        where: filter || {},
      });
    } catch (error) {
      this.logger.error(
        `Failed to count brands: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}

// import { Inject, Injectable } from '@nestjs/common';
// import { CreateBrandInput } from './dto/create-brand.input';
// import { UpdateBrandInput } from './dto/update-brand.input';
// import { Brand } from './entities/brand.entity';

// @Injectable()
// export class BrandService {
//   constructor(
//     @Inject('BRAND_REPOSITORY')
//     private brandRepository: typeof Brand,
//   ) {}
//   async create(createBrandInput: CreateBrandInput): Promise<Brand> {
//     return await this.brandRepository.create({
//       ...createBrandInput,
//     });
//   }

//   async findAll(): Promise<Brand[]> {
//     return await this.brandRepository.findAll<Brand>({ raw: true });
//   }

//   async findOne(search: any) {
//     const brand = await this.brandRepository.findOne<Brand>({
//       where: search,
//     });
//     if (!brand) {
//       throw new Error('brand not found');
//     }
//     return brand;
//   }

//   async findEmail(email: string) {
//     return await this.brandRepository.findOne<Brand>({
//       where: { email: email },
//     });
//   }

//   async update(id: string, data: UpdateBrandInput): Promise<Brand> {
//     const brand = await this.brandRepository.findOne({
//       where: { id: id },
//     });
//     if (!brand) {
//       throw new Error('brand not found');
//     }
//     await brand.update({ ...data });
//     await brand.save();
//     return brand;
//   }

//   async remove(id: string): Promise<Brand> {
//     const brand = await this.brandRepository.findOne<Brand>({
//       where: { id: id },
//     });
//     if (!brand) {
//       throw new Error('brand not found');
//     }
//     await brand.destroy();
//     return brand;
//   }
// }
