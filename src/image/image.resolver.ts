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
    return this.imageService.create(createImageInput);
  }

  @Query(() => [Image], { name: 'image' })
  async findAll() {
    return await this.imageService.findAll();
  }

  @Query(() => Image, { name: 'image' })
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
