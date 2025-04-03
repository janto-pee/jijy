import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag } from './entities/tag.entity';
import { WhereOptions, Op, FindOptions } from 'sequelize';
import { PaginationArgs } from 'src/common/dto/pagination.dto';

@Injectable()
export class TagService {
  private readonly logger = new Logger(TagService.name);

  constructor(
    @Inject('tag_REPOSITORY')
    private TagsRepository: typeof Tag,
  ) {}

  async create(createTagInput: CreateTagInput): Promise<Tag> {
    try {
      return await this.TagsRepository.create(
        {
          ...createTagInput,
        },
        { raw: true },
      );
    } catch (error) {
      this.logger.error(`Failed to create tag: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(pagination?: PaginationArgs): Promise<Tag[]> {
    try {
      const options: FindOptions = { raw: true };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        options.order = [['createdAt', 'DESC']];
      }

      return await this.TagsRepository.findAll<Tag>(options);
    } catch (error) {
      this.logger.error(`Failed to fetch tags: ${error.message}`, error.stack);
      throw error;
    }
  }

  async filterBy(
    search: WhereOptions<any>,
    pagination?: PaginationArgs,
    sortOptions?: { sortBy?: string; sortOrder?: 'ASC' | 'DESC' },
  ): Promise<Tag[]> {
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

      return await this.TagsRepository.findAll(options);
    } catch (error) {
      this.logger.error(`Failed to filter tags: ${error.message}`, error.stack);
      throw error;
    }
  }
  async search(term: string, pagination?: PaginationArgs): Promise<Tag[]> {
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

      return await this.TagsRepository.findAll(options);
    } catch (error) {
      this.logger.error(`Failed to search tags: ${error.message}`, error.stack);
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

      return await this.TagsRepository.count({
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

  async findOne(search: WhereOptions<any>): Promise<Tag> {
    try {
      const tag = await this.TagsRepository.findOne<Tag>({
        where: search,
      });

      if (!tag) {
        throw new NotFoundException(`Tag not found`);
      }

      return tag;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to find tag: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, data: UpdateTagInput): Promise<Tag> {
    try {
      const tag = await this.TagsRepository.findOne({
        where: { id },
      });

      if (!tag) {
        throw new NotFoundException(`Tag with ID ${id} not found`);
      }

      await tag.update({ ...data });
      await tag.save();

      return tag;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to update tag: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: string): Promise<Tag> {
    try {
      const tag = await this.TagsRepository.findOne<Tag>({
        where: { id },
      });

      if (!tag) {
        throw new NotFoundException(`Tag with ID ${id} not found`);
      }

      await tag.destroy();
      return tag;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to remove tag: ${error.message}`, error.stack);
      throw error;
    }
  }

  async countTags(filter?: WhereOptions<any>): Promise<number> {
    try {
      return await this.TagsRepository.count({
        where: filter || {},
      });
    } catch (error) {
      this.logger.error(`Failed to count tags: ${error.message}`, error.stack);
      throw error;
    }
  }
}

// import { Inject, Injectable } from '@nestjs/common';
// import { CreateTagInput } from './dto/create-tag.input';
// import { UpdateTagInput } from './dto/update-tag.input';
// import { Tag } from './entities/tag.entity';

// @Injectable()
// export class TagService {
//   constructor(
//     @Inject('TAG_REPOSITORY')
//     private TagsRepository: typeof Tag,
//   ) {}
//   async create(createTagInput: CreateTagInput): Promise<Tag> {
//     return await this.TagsRepository.create({
//       ...createTagInput,
//     });
//   }

//   async findAll(): Promise<Tag[]> {
//     return await this.TagsRepository.findAll<Tag>({ raw: true });
//   }

//   async filterBy(search: any): Promise<Tag[]> {
//     return await this.TagsRepository.findAll({
//       where: search,
//       raw: true,
//     });
//   }

//   async findOne(search: any): Promise<Tag> {
//     const tag = await this.TagsRepository.findOne<Tag>({
//       where: { id: search },
//     });
//     if (!tag) {
//       throw new Error('Tag not found');
//     }
//     return tag;
//   }

//   async findEmail(email: string): Promise<Tag> {
//     const tag = await this.TagsRepository.findOne<Tag>({
//       where: { email: email },
//     });
//     if (!tag) {
//       throw new Error('Tag not found');
//     }
//     return tag;
//   }

//   async update(id: string, data: UpdateTagInput): Promise<Tag> {
//     const Tag = await this.TagsRepository.findOne({
//       where: { id: id },
//     });
//     if (!Tag) {
//       throw new Error('Tag not found');
//     }
//     await Tag.update({ ...data });
//     await Tag.save();
//     return Tag;
//   }

//   async remove(id: string): Promise<Tag> {
//     const Tag = await this.TagsRepository.findOne<Tag>({
//       where: { id: id },
//     });
//     if (!Tag) {
//       throw new Error('Tag not found');
//     }
//     await Tag.destroy();
//     return Tag;
//   }
// }
