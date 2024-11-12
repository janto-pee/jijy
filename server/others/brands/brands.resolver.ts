import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BrandsService } from './brands.service';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';

@Resolver('Brand')
export class BrandsResolver {
  constructor(private readonly brandsService: BrandsService) {}

  @Mutation('createBrand')
  create(@Args('createBrandInput') createBrandInput: CreateBrandInput) {
    return this.brandsService.create(createBrandInput);
  }

  @Query('brands')
  findAll() {
    return this.brandsService.findAll();
  }

  @Query('brand')
  findOne(@Args('id') id: number) {
    return this.brandsService.findOne(id);
  }

  @Mutation('updateBrand')
  update(@Args('updateBrandInput') updateBrandInput: UpdateBrandInput) {
    return this.brandsService.update(updateBrandInput.id, updateBrandInput);
  }

  @Mutation('removeBrand')
  remove(@Args('id') id: number) {
    return this.brandsService.remove(id);
  }
}
