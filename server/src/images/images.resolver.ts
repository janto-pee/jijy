import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ImagesService } from './images.service';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';

@Resolver('Image')
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Mutation('createImage')
  create(@Args('createImageInput') createImageInput: CreateImageInput) {
    return this.imagesService.create(createImageInput);
  }

  @Query('images')
  findAll() {
    return this.imagesService.findAll();
  }

  @Query('image')
  findOne(@Args('id') id: number) {
    return this.imagesService.findOne(id);
  }

  @Mutation('updateImage')
  update(@Args('updateImageInput') updateImageInput: UpdateImageInput) {
    return this.imagesService.update(updateImageInput.id, updateImageInput);
  }

  @Mutation('removeImage')
  remove(@Args('id') id: number) {
    return this.imagesService.remove(id);
  }
}
