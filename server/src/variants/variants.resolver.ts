import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VariantsService } from './variants.service';
import { CreateVariantInput } from './dto/create-variant.input';
import { UpdateVariantInput } from './dto/update-variant.input';

@Resolver('Variant')
export class VariantsResolver {
  constructor(private readonly variantsService: VariantsService) {}

  @Mutation('createVariant')
  create(@Args('createVariantInput') createVariantInput: CreateVariantInput) {
    return this.variantsService.create(createVariantInput);
  }

  @Query('variants')
  findAll() {
    return this.variantsService.findAll();
  }

  @Query('variant')
  findOne(@Args('id') id: number) {
    return this.variantsService.findOne(id);
  }

  @Mutation('updateVariant')
  update(@Args('updateVariantInput') updateVariantInput: UpdateVariantInput) {
    return this.variantsService.update(
      updateVariantInput.id,
      updateVariantInput,
    );
  }

  @Mutation('removeVariant')
  remove(@Args('id') id: number) {
    return this.variantsService.remove(id);
  }
}
