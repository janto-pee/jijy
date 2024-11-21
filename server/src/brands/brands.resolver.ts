import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BrandsService } from './brands.service';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';

@Resolver('Brand')
export class BrandsResolver {
  constructor(private readonly brandsService: BrandsService) {}

  @Mutation('createBrand')
  async create(@Args('createBrandInput') createBrandInput: CreateBrandInput) {
    return await this.brandsService.create(createBrandInput);
  }

  @Query('brands')
  async findAll() {
    return await this.brandsService.findAll();
  }

  @Query('brand')
  async findOne(@Args('id') id: number) {
    return await this.brandsService.findOne(id);
  }

  @Mutation('updateBrand')
  async update(@Args('updateBrandInput') updateBrandInput: UpdateBrandInput) {
    return await this.brandsService.update(
      updateBrandInput.id,
      updateBrandInput,
    );
  }

  @Mutation('removeBrand')
  async remove(@Args('id') id: number) {
    return await this.brandsService.remove(id);
  }
}
