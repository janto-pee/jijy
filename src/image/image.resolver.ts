import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ImageService } from './image.service';
import { Image } from './entities/image.entity';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';

@Resolver(() => Image)
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @Mutation(() => Image)
  async createImage(
    @Args('createImageInput') createImageInput: CreateImageInput,
  ) {
    const image = (await this.imageService.create(createImageInput)).dataValues;
    return image;
  }

  @Query(() => [Image], { name: 'Images' })
  async findAll() {
    const images = await this.imageService.findAll();
    console.log('imges resolver..........', images);
    return images;
  }

  @Query(() => Image, { name: 'Image' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    const data = await this.imageService.findOne(id);
    if (!data) {
      throw new Error('data not found');
    }
    return data.dataValues;
  }

  @Mutation(() => Image)
  async updateImage(
    @Args('updateImageInput') updateImageInput: UpdateImageInput,
  ) {
    const data = await this.imageService.update(
      updateImageInput.id,
      updateImageInput,
    );
    if (!data) {
      throw new Error('address not found');
    }
    return data.dataValues;
  }

  @Mutation(() => Image)
  async removeImage(@Args('id', { type: () => String }) id: string) {
    const data = await this.imageService.remove(id);
    if (!data) {
      throw new Error('address not found');
    }
    return data.dataValues;
  }
}
