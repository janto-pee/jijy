import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateAttributeInput } from './dto/create-attribute.input';
import { UpdateAttributeInput } from './dto/update-attribute.input';
import { Attribute } from './entities/attribute.entity';
import { WhereOptions, Op, FindOptions } from 'sequelize';
import { PaginationArgs } from 'src/common/dto/pagination.dto';

@Injectable()
export class AttributeService {
  private readonly logger = new Logger(AttributeService.name);

  constructor(
    @Inject('ATTRIBUTE_REPOSITORY')
    private AttributesRepository: typeof Attribute,
  ) {}

  async create(CreateAttributeInput: CreateAttributeInput): Promise<Attribute> {
    try {
      return await this.AttributesRepository.create(
        {
          ...CreateAttributeInput,
        },
        { raw: true },
      );
    } catch (error) {
      this.logger.error(
        `Failed to create attribute: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(pagination?: PaginationArgs): Promise<Attribute[]> {
    try {
      const options: FindOptions = { raw: true };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        options.order = [['createdAt', 'DESC']];
      }

      return await this.AttributesRepository.findAll<Attribute>(options);
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
    sortOptions?: { sortBy?: string; sortOrder?: 'ASC' | 'DESC' },
  ): Promise<Attribute[]> {
    try {
      const options: FindOptions = {
        where: search,
        raw: true,
      };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        options.order = [['createdAt', 'DESC']];
      }
      // Apply sorting if provided
      if (sortOptions && sortOptions.sortBy) {
        const order = sortOptions.sortOrder || 'ASC';
        options.order = [[sortOptions.sortBy, order]];
      } else {
        options.order = [['createdAt', 'DESC']];
      }

      return await this.AttributesRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to filter products: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async search(
    term: string,
    pagination?: PaginationArgs,
  ): Promise<Attribute[]> {
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
        options.order = [['createdAt', 'DESC']];
      }

      return await this.AttributesRepository.findAll(options);
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

      return await this.AttributesRepository.count({
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

  async findOne(search: WhereOptions<any>): Promise<Attribute> {
    try {
      const attribute = await this.AttributesRepository.findOne<Attribute>({
        where: search,
      });

      if (!attribute) {
        throw new NotFoundException(`Attribute not found`);
      }

      return attribute;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to find attribute: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(id: string, data: UpdateAttributeInput): Promise<Attribute> {
    try {
      const attribute = await this.AttributesRepository.findOne({
        where: { id },
      });

      if (!attribute) {
        throw new NotFoundException(`Attribute with ID ${id} not found`);
      }

      await attribute.update({ ...data });
      await attribute.save();

      return attribute;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to update attribute: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string): Promise<Attribute> {
    try {
      const attribute = await this.AttributesRepository.findOne<Attribute>({
        where: { id },
      });

      if (!attribute) {
        throw new NotFoundException(`Attribute with ID ${id} not found`);
      }

      await attribute.destroy();
      return attribute;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to remove attribute: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async countAttributes(filter?: WhereOptions<any>): Promise<number> {
    try {
      return await this.AttributesRepository.count({
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
