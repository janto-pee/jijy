import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VariantsService } from './variants.service';
import { CreateVariantInput } from './dto/create-variant.input';
import { UpdateVariantInput } from './dto/update-variant.input';

@Resolver('Variant')
export class VariantsResolver {
  constructor(private readonly variantsService: VariantsService) {}

  @Mutation('createVariant')
  async create(
    @Args('createVariantInput') createVariantInput: CreateVariantInput,
  ) {
    return await this.variantsService.create(createVariantInput);
  }

  @Query('variants')
  async findAll() {
    return await this.variantsService.findAll();
  }

  @Query('variant')
  async findOne(@Args('id') id: number) {
    return await this.variantsService.findOne(id);
  }

  @Mutation('updateVariant')
  async update(
    @Args('updateVariantInput') updateVariantInput: UpdateVariantInput,
  ) {
    return await this.variantsService.update(
      updateVariantInput.id,
      updateVariantInput,
    );
  }

  @Mutation('removeVariant')
  async remove(@Args('id') id: number) {
    return await this.variantsService.remove(id);
  }
}
