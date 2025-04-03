import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ImageService } from 'src/image/image.service';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { Image } from './entities/image.entity';
import { ImageResponse } from './dto/image-response.dto';
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
import { SearchImageInput } from './dto/search-image.input';

@Resolver(() => Image)
export class ImageResolver {
  private readonly logger = new Logger(ImageResolver.name);

  constructor(private readonly imageService: ImageService) {}

  @Mutation(() => ImageResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async createImage(
    @Args('createImageInput') createImageInput: CreateImageInput,
    @CurrentUser() user: User,
  ) {
    try {
      // Validate input data
      this.logger.error(
        `user ${user.id} with shopId: ${user.shopId} is trying to upload image for product: ${createImageInput.productId}`,
      );

      if (!createImageInput.productId) {
        throw new BadRequestException('Image name are required');
      }

      // Add user context
      if (user.shopId) {
        createImageInput.shopId = createImageInput.shopId || user.shopId;
      }

      // Verify user has permission to create image for this shop
      if (
        user.role !== UserRole.ADMIN &&
        createImageInput.shopId !== user.shopId
      ) {
        throw new ForbiddenException(
          'You can only create images for your own shop',
        );
      }

      const image = await this.imageService.create(createImageInput);
      return {
        success: true,
        message: 'Image created successfully',
        image: image.dataValues,
      };
    } catch (error) {
      this.logger.error(
        `Failed to create image: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => ImageResponse, { name: 'Images' })
  async findAll(
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Use Promise.all for parallel execution
      const [images, totalCount] = await Promise.all([
        this.imageService.findAll(paginationParams),
        this.imageService.countImages(),
      ]);

      return {
        items: images,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch images: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => ImageResponse, { name: 'SearchImages' })
  async searchImages(
    @Args('searchInput') searchInput: SearchImageInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      const { term, url, productId } = searchInput;

      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Build filter criteria
      const filter: any = {};

      if (url) filter.url = url;
      if (productId) filter.productId = productId;

      let images;
      let totalCount;

      if (term) {
        // If term is provided, use search functionality
        [images, totalCount] = await Promise.all([
          this.imageService.search(term, paginationParams),
          this.imageService.countSearchResults(term, filter),
        ]);
      } else {
        // Otherwise use filter
        [images, totalCount] = await Promise.all([
          this.imageService.filterBy(filter, paginationParams),
          this.imageService.countImages(filter),
        ]);
      }

      return {
        items: images,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to search images: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => Image, { name: 'Image' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Image ID is required');
      }

      const image = await this.imageService.findOne({ id });
      if (!image) {
        throw new NotFoundException(`Image with ID ${id} not found`);
      }

      return image.dataValues;
    } catch (error) {
      this.logger.error(`Failed to find image: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Mutation(() => Image)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async updateImage(
    @Args('updateImageInput') updateImageInput: UpdateImageInput,
    @CurrentUser() user: User,
  ) {
    try {
      if (!updateImageInput.id) {
        throw new BadRequestException('Image ID is required for update');
      }

      // Add validation for required fields
      if (!updateImageInput.productId || !updateImageInput.shopId) {
        throw new BadRequestException('Price must be greater than zero');
      }

      // Check if user has permission to update this image
      const image = await this.imageService.findOne({
        id: updateImageInput.id,
      });

      if (user.role !== UserRole.ADMIN && image.userId !== user.id) {
        throw new ForbiddenException(
          'You can only update images from your own shop',
        );
      }

      const data = await this.imageService.update(
        updateImageInput.id,
        updateImageInput,
      );

      return data.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to update image: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Mutation(() => Image)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async removeImage(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ) {
    try {
      if (!id) {
        throw new BadRequestException('Image ID is required');
      }

      // Check if user has permission to delete this image
      const image = await this.imageService.findOne({ id });

      if (user.role !== UserRole.ADMIN && image.userId !== user.id) {
        throw new ForbiddenException(
          'You can only delete images from your own shop',
        );
      }

      const result = await this.imageService.remove(id);
      return result.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to remove image: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Query(() => ImageResponse, { name: 'MyShopImages' })
  @UseGuards(JwtAuthGuard)
  async getMyShopImages(
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

      const [images, totalCount] = await Promise.all([
        this.imageService.filterBy(filter, paginationParams),
        this.imageService.countImages(filter),
      ]);

      return {
        items: images,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch shop images: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  // ResolveField methods remain the same
  // @ResolveField()
  // async attributes(@Parent() image: Image) {
  //   try {
  //     const { id } = image;
  //     const attribute = await this.attributeService.findOne({ imageId: id });
  //     return attribute ? attribute.dataValues : null;
  //   } catch (error) {
  //     this.logger.error(
  //       `Failed to resolve attributes: ${error.message}`,
  //       error.stack,
  //     );
  //     return null;
  //   }
  // }
}
