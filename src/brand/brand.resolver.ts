import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';

@Resolver(() => Brand)
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Mutation(() => Brand)
  async createBrand(
    @Args('createBrandInput') createBrandInput: CreateBrandInput,
  ) {
    return await this.brandService.create(createBrandInput);
  }

  @Query(() => [Brand], { name: 'brand' })
  async findAll() {
    return await this.brandService.findAll();
  }

  @Query(() => Brand, { name: 'brand' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.brandService.findOne(id);
  }

  @Mutation(() => Brand)
  async updateBrand(
    @Args('updateBrandInput') updateBrandInput: UpdateBrandInput,
  ) {
    return await this.brandService.update(
      updateBrandInput.id,
      updateBrandInput,
    );
  }

  @Mutation(() => Brand)
  async removeBrand(@Args('id', { type: () => String }) id: string) {
    return await this.brandService.remove(id);
  }
}
