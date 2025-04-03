import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateShopInput } from './dto/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';
import { Shop } from './entities/shop.entity';
import { WhereOptions, Op, FindOptions } from 'sequelize';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class ShopService {
  private readonly logger = new Logger(ShopService.name);

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private ShopsRepository: typeof Shop,
    private TagsRepository: typeof Tag,
  ) {}

  async create(createShopInput: CreateShopInput): Promise<Shop> {
    try {
      return await this.ShopsRepository.create(
        {
          ...createShopInput,
        },
        { raw: true },
      );
    } catch (error) {
      this.logger.error(`Failed to create shop: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(pagination?: PaginationArgs): Promise<Shop[]> {
    try {
      const options: FindOptions = { raw: true };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        // options.shop = [['createdAt', 'DESC']];
      }

      return await this.ShopsRepository.findAll<Shop>(options);
    } catch (error) {
      this.logger.error(`Failed to fetch shops: ${error.message}`, error.stack);
      throw error;
    }
  }

  async filterBy(
    search: WhereOptions<any>,
    pagination?: PaginationArgs,
    sortOptions?: { sortBy?: string; sortShop?: 'ASC' | 'DESC' },
  ): Promise<Shop[]> {
    try {
      const options: FindOptions = {
        where: search,
        raw: true,
      };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        // options.shop = [['createdAt', 'DESC']];
      }
      // Apply sorting if provided
      // if (sortOptions && sortOptions.sortBy) {
      (sortOptions && sortOptions.sortShop) || 'ASC';
      //   options.shop = [[sortOptions.sortBy, shop]];
      // } else {
      //   options.shop = [['createdAt', 'DESC']];
      // }

      return await this.ShopsRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to filter shops: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async search(term: string, pagination?: PaginationArgs): Promise<Shop[]> {
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
        // options.shop = [['createdAt', 'DESC']];
      }

      return await this.ShopsRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to search shops: ${error.message}`,
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

      return await this.ShopsRepository.count({
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

  async findOne(search: WhereOptions<any>): Promise<Shop> {
    try {
      const shop = await this.ShopsRepository.findOne<Shop>({
        where: search,
      });

      if (!shop) {
        throw new NotFoundException(`Shop not found`);
      }

      return shop;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to find shop: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, data: UpdateShopInput): Promise<Shop> {
    try {
      const shop = await this.ShopsRepository.findOne({
        where: { id },
      });

      if (!shop) {
        throw new NotFoundException(`Shop with ID ${id} not found`);
      }

      await shop.update({ ...data });
      await shop.save();

      return shop;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to update shop: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: string): Promise<Shop> {
    try {
      const shop = await this.ShopsRepository.findOne<Shop>({
        where: { id },
      });

      if (!shop) {
        throw new NotFoundException(`Shop with ID ${id} not found`);
      }

      await shop.destroy();
      return shop;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to remove shop: ${error.message}`, error.stack);
      throw error;
    }
  }

  async countShops(filter?: WhereOptions<any>): Promise<number> {
    try {
      return await this.ShopsRepository.count({
        where: filter || {},
      });
    } catch (error) {
      this.logger.error(`Failed to count shops: ${error.message}`, error.stack);
      throw error;
    }
  }
}

// import { Inject, Injectable } from '@nestjs/common';
// import { CreateShopInput } from './dto/create-shop.input';
// import { UpdateShopInput } from './dto/update-shop.input';
// import { Shop } from './entities/shop.entity';

// @Injectable()
// export class ShopService {
//   constructor(
//     @Inject('SHOP_REPOSITORY')
//     private ShopsRepository: typeof Shop,
//   ) {}
//   async create(createShopInput: CreateShopInput): Promise<Shop> {
//     return await this.ShopsRepository.create({
//       ...createShopInput,
//     });
//   }

//   async findAll(): Promise<Shop[]> {
//     return await this.ShopsRepository.findAll<Shop>({ raw: true });
//   }

//   // async findOne(id: string): Promise<Shop> {
//   //   const shop = await this.ShopsRepository.findOne<Shop>({
//   //     where: { id: id },
//   //   });
//   //   if (!shop) {
//   //     throw new Error();
//   //   }
//   //   return shop;
//   // }
//   async findOne(search: any): Promise<Shop> {
//     const shop = await this.ShopsRepository.findOne<Shop>({
//       where: search,
//     });
//     if (!shop) {
//       throw new Error();
//     }
//     return shop;
//   }
//   async findEmail(email: string): Promise<Shop> {
//     const shop = await this.ShopsRepository.findOne<Shop>({
//       where: { email: email },
//     });
//     if (!shop) {
//       throw new Error();
//     }
//     return shop;
//   }

//   async update(id: string, data: UpdateShopInput): Promise<Shop> {
//     const shop = await this.ShopsRepository.findOne({
//       where: { id: id },
//     });
//     if (!shop) {
//       throw new Error('Shop not found');
//     }
//     await shop.update({ ...data });
//     await shop.save();
//     return shop;
//   }

//   async remove(id: string): Promise<Shop> {
//     const shop = await this.ShopsRepository.findOne<Shop>({
//       where: { id: id },
//     });
//     if (!shop) {
//       throw new Error('Shop not found');
//     }
//     await shop.destroy;
//     return shop;
//   }
// }
