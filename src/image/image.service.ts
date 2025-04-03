import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { Image } from './entities/image.entity';
import { WhereOptions, Op, FindOptions } from 'sequelize';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private ImagesRepository: typeof Image,
    private TagsRepository: typeof Tag,
  ) {}

  async create(createImageInput: CreateImageInput): Promise<Image> {
    try {
      return await this.ImagesRepository.create(
        {
          ...createImageInput,
        },
        { raw: true },
      );
    } catch (error) {
      this.logger.error(
        `Failed to create image: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(pagination?: PaginationArgs): Promise<Image[]> {
    try {
      const options: FindOptions = { raw: true };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        options.order = [['createdAt', 'DESC']];
      }

      return await this.ImagesRepository.findAll<Image>(options);
    } catch (error) {
      this.logger.error(
        `Failed to fetch images: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async filterBy(
    search: WhereOptions<any>,
    pagination?: PaginationArgs,
    sortOptions?: { sortBy?: string; sortOrder?: 'ASC' | 'DESC' },
  ): Promise<Image[]> {
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

      return await this.ImagesRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to filter images: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async search(term: string, pagination?: PaginationArgs): Promise<Image[]> {
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

      return await this.ImagesRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to search images: ${error.message}`,
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

      return await this.ImagesRepository.count({
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

  async findOne(search: WhereOptions<any>): Promise<Image> {
    try {
      const image = await this.ImagesRepository.findOne<Image>({
        where: search,
      });

      if (!image) {
        throw new NotFoundException(`Image not found`);
      }

      return image;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to find image: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, data: UpdateImageInput): Promise<Image> {
    try {
      const image = await this.ImagesRepository.findOne({
        where: { id },
      });

      if (!image) {
        throw new NotFoundException(`Image with ID ${id} not found`);
      }

      await image.update({ ...data });
      await image.save();

      return image;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to update image: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string): Promise<Image> {
    try {
      const image = await this.ImagesRepository.findOne<Image>({
        where: { id },
      });

      if (!image) {
        throw new NotFoundException(`Image with ID ${id} not found`);
      }

      await image.destroy();
      return image;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `Failed to remove image: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async countImages(filter?: WhereOptions<any>): Promise<number> {
    try {
      return await this.ImagesRepository.count({
        where: filter || {},
      });
    } catch (error) {
      this.logger.error(
        `Failed to count images: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}

// import { Inject, Injectable } from '@nestjs/common';
// import { CreateImageInput } from './dto/create-image.input';
// import { UpdateImageInput } from './dto/update-image.input';
// import { Image } from './entities/image.entity';

// @Injectable()
// export class ImageService {
//   constructor(
//     @Inject('IMAGE_REPOSITORY')
//     private ImagesRepository: typeof Image,
//   ) {}
//   async create(createImageInput: CreateImageInput): Promise<Image> {
//     return await this.ImagesRepository.create({
//       ...createImageInput,
//     });
//   }

//   async findAll(): Promise<Image[]> {
//     const images = await this.ImagesRepository.findAll<Image>({ raw: true });
//     return images;
//   }

//   async findOne(search: any): Promise<Image> {
//     const image = await this.ImagesRepository.findOne<Image>({
//       where: search,
//     });
//     if (!image) {
//       throw new Error();
//     }
//     return image;
//   }

//   async filterBy(search: any): Promise<Image[]> {
//     return await this.ImagesRepository.findAll({
//       where: search,
//       raw: true,
//     });
//   }

//   async findEmail(email: string): Promise<Image> {
//     const image = await this.ImagesRepository.findOne<Image>({
//       where: { email: email },
//     });
//     if (!image) {
//       throw new Error();
//     }
//     return image;
//   }

//   async update(id: string, data: UpdateImageInput): Promise<Image> {
//     const Image = await this.ImagesRepository.findOne({
//       where: { id: id },
//     });
//     if (!Image) {
//       throw new Error('Image not found');
//     }
//     await Image.update({ ...data });
//     await Image.save();
//     return Image;
//   }

//   async remove(id: string): Promise<Image> {
//     const image = await this.ImagesRepository.findOne<Image>({
//       where: { id: id },
//     });
//     if (!image) {
//       throw new Error();
//     }
//     await image.destroy();
//     return image;
//   }
// }
