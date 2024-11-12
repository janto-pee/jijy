import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatgeoriesService } from './catgeories.service';
import { CreateCatgeoryInput } from './dto/create-catgeory.input';
import { UpdateCatgeoryInput } from './dto/update-catgeory.input';

@Resolver('Catgeory')
export class CatgeoriesResolver {
  constructor(private readonly catgeoriesService: CatgeoriesService) {}

  @Mutation('createCatgeory')
  create(@Args('createCatgeoryInput') createCatgeoryInput: CreateCatgeoryInput) {
    return this.catgeoriesService.create(createCatgeoryInput);
  }

  @Query('catgeories')
  findAll() {
    return this.catgeoriesService.findAll();
  }

  @Query('catgeory')
  findOne(@Args('id') id: number) {
    return this.catgeoriesService.findOne(id);
  }

  @Mutation('updateCatgeory')
  update(@Args('updateCatgeoryInput') updateCatgeoryInput: UpdateCatgeoryInput) {
    return this.catgeoriesService.update(updateCatgeoryInput.id, updateCatgeoryInput);
  }

  @Mutation('removeCatgeory')
  remove(@Args('id') id: number) {
    return this.catgeoriesService.remove(id);
  }
}
