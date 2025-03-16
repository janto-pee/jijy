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
    const image = await this.imageService.create(createImageInput);
    console.log(image);
    return image.dataValues;
  }

  @Query(() => [Image], { name: 'Images' })
  async findAll() {
    const images = await this.imageService.findAll();
    console.log('imges resolver..........', images);
    return images;
  }

  @Query(() => Image, { name: 'Image' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.imageService.findOne(id);
  }

  @Mutation(() => Image)
  async updateImage(
    @Args('updateImageInput') updateImageInput: UpdateImageInput,
  ) {
    return await this.imageService.update(
      updateImageInput.id,
      updateImageInput,
    );
  }

  @Mutation(() => Image)
  async removeImage(@Args('id', { type: () => String }) id: string) {
    return await this.imageService.remove(id);
  }
}
