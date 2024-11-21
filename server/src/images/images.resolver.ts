import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ImagesService } from './images.service';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';

@Resolver('Image')
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Mutation('createImage')
  async create(@Args('createImageInput') createImageInput: CreateImageInput) {
    return await this.imagesService.create(createImageInput);
  }

  @Query('images')
  async findAll() {
    return await this.imagesService.findAll();
  }

  @Query('image')
  async findOne(@Args('id') id: number) {
    return await this.imagesService.findOne(id);
  }

  @Mutation('updateImage')
  async update(@Args('updateImageInput') updateImageInput: UpdateImageInput) {
    return await this.imagesService.update(
      updateImageInput.id,
      updateImageInput,
    );
  }

  @Mutation('removeImage')
  async remove(@Args('id') id: number) {
    return await this.imagesService.remove(id);
  }
}
