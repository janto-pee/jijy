import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { Address } from './entities/address.entity';
import { WhereOptions, Op, FindOptions } from 'sequelize';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class AddressService {
  private readonly logger = new Logger(AddressService.name);

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private AddresssRepository: typeof Address,
    private TagsRepository: typeof Tag,
  ) {}

  async create(createAddressInput: CreateAddressInput): Promise<Address> {
    try {
      return await this.AddresssRepository.create(
        {
          ...createAddressInput,
        },
        { raw: true },
      );
    } catch (error) {
      this.logger.error(
        `Failed to create address: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(pagination?: PaginationArgs): Promise<Address[]> {
    try {
      const options: FindOptions = { raw: true };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        // options.address = [['createdAt', 'DESC']];
      }

      return await this.AddresssRepository.findAll<Address>(options);
    } catch (error) {
      this.logger.error(
        `Failed to fetch addresss: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async filterBy(
    search: WhereOptions<any>,
    pagination?: PaginationArgs,
    sortOptions?: { sortBy?: string; sortAddress?: 'ASC' | 'DESC' },
  ): Promise<Address[]> {
    try {
      const options: FindOptions = {
        where: search,
        raw: true,
      };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        // options.address = [['createdAt', 'DESC']];
      }
      // Apply sorting if provided
      // if (sortOptions && sortOptions.sortBy) {
      (sortOptions && sortOptions.sortAddress) || 'ASC';
      //   options.address = [[sortOptions.sortBy, address]];
      // } else {
      //   options.address = [['createdAt', 'DESC']];
      // }

      return await this.AddresssRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to filter addresss: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async search(term: string, pagination?: PaginationArgs): Promise<Address[]> {
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
        // options.address = [['createdAt', 'DESC']];
      }

      return await this.AddresssRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to search addresss: ${error.message}`,
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

      return await this.AddresssRepository.count({
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

  async findOne(search: WhereOptions<any>): Promise<Address> {
    try {
      const address = await this.AddresssRepository.findOne<Address>({
        where: search,
      });

      if (!address) {
        throw new NotFoundException(`Address not found`);
      }

      return address;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to find address: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(id: string, data: UpdateAddressInput): Promise<Address> {
    try {
      const address = await this.AddresssRepository.findOne({
        where: { id },
      });

      if (!address) {
        throw new NotFoundException(`Address with ID ${id} not found`);
      }

      await address.update({ ...data });
      await address.save();

      return address;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to update address: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string): Promise<Address> {
    try {
      const address = await this.AddresssRepository.findOne<Address>({
        where: { id },
      });

      if (!address) {
        throw new NotFoundException(`Address with ID ${id} not found`);
      }

      await address.destroy();
      return address;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to remove address: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async countAddresss(filter?: WhereOptions<any>): Promise<number> {
    try {
      return await this.AddresssRepository.count({
        where: filter || {},
      });
    } catch (error) {
      this.logger.error(
        `Failed to count addresss: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}

// import { Inject, Injectable } from '@nestjs/common';
// import { CreateAddressInput } from './dto/create-address.input';
// import { UpdateAddressInput } from './dto/update-address.input';
// import { Address } from './entities/address.entity';

// @Injectable()
// export class AddressService {
//   constructor(
//     @Inject('ADDRESS_REPOSITORY')
//     private addresssRepository: typeof Address,
//   ) {}

//   async create(createAddressInput: CreateAddressInput): Promise<Address> {
//     return await this.addresssRepository.create({
//       ...createAddressInput,
//     });
//   }

//   async findAll(): Promise<Address[]> {
//     return await this.addresssRepository.findAll<Address>({ raw: true });
//   }

//   async findOne(search: any) {
//     return await this.addresssRepository.findOne<Address>({
//       where: search,
//     });
//   }

//   async update(id: string, data: UpdateAddressInput): Promise<Address> {
//     const Address = await this.addresssRepository.findOne({
//       where: { id: id },
//     });
//     if (!Address) {
//       throw new Error('unable to find address');
//     }
//     await Address.update({ ...data });
//     await Address.save();
//     return Address;
//   }

//   async remove(id: string): Promise<Address> {
//     const address = await this.addresssRepository.findOne<Address>({
//       where: { id: id },
//     });
//     if (!address) {
//       throw new Error('address not found');
//     }
//     await address.destroy();
//     return address;
//   }
// }
