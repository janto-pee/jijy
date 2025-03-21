import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { ProductService } from 'src/product/product.service';

@Resolver(() => Brand)
export class BrandResolver {
  constructor(
    private readonly brandService: BrandService,
    private readonly productService: ProductService,
  ) {}

  @Mutation(() => Brand)
  async createBrand(
    @Args('createBrandInput') createBrandInput: CreateBrandInput,
  ) {
    return (await this.brandService.create(createBrandInput)).dataValues;
  }

  @Query(() => [Brand], { name: 'Brands' })
  async findAll() {
    return await this.brandService.findAll();
  }

  @Query(() => Brand, { name: 'Brand' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    const data = await this.brandService.findOne({ id: id });
    if (!data) {
      throw new Error('data not found');
    }
    return data.dataValues;
  }

  @Mutation(() => Brand)
  async updateBrand(
    @Args('updateBrandInput') updateBrandInput: UpdateBrandInput,
  ) {
    const data = await this.brandService.update(
      updateBrandInput.id,
      updateBrandInput,
    );
    return data.dataValues;
  }

  @Mutation(() => Brand)
  async removeBrand(@Args('id', { type: () => String }) id: string) {
    const data = await this.brandService.remove(id);
    if (!data) {
      throw new Error('address not found');
    }
    return data.dataValues;
  }

  /**
   *
   * RESOLVER
   */

  @ResolveField()
  async product(@Parent() brand: Brand) {
    const { id } = brand;
    return await this.productService.filterBy({ productId: id });
  }
}
