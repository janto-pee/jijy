import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VariantService } from './variant.service';
import { Variant } from './entities/variant.entity';
import { CreateVariantInput } from './dto/create-variant.input';
import { UpdateVariantInput } from './dto/update-variant.input';

@Resolver(() => Variant)
export class VariantResolver {
  constructor(private readonly variantService: VariantService) {}

  @Mutation(() => Variant)
  createVariant(@Args('createVariantInput') createVariantInput: CreateVariantInput) {
    return this.variantService.create(createVariantInput);
  }

  @Query(() => [Variant], { name: 'variant' })
  findAll() {
    return this.variantService.findAll();
  }

  @Query(() => Variant, { name: 'variant' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.variantService.findOne(id);
  }

  @Mutation(() => Variant)
  updateVariant(@Args('updateVariantInput') updateVariantInput: UpdateVariantInput) {
    return this.variantService.update(updateVariantInput.id, updateVariantInput);
  }

  @Mutation(() => Variant)
  removeVariant(@Args('id', { type: () => Int }) id: number) {
    return this.variantService.remove(id);
  }
}
