import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VariantService } from './variant.service';
import { CreateVariantInput } from './dto/create-variant.input';
import { UpdateVariantInput } from './dto/update-variant.input';
import { Variant } from './entities/variant.entity';

@Resolver(() => Variant)
export class VariantResolver {
  constructor(private readonly VariantService: VariantService) {}

  @Mutation(() => Variant)
  async createVariant(
    @Args('createVariantInput') createVariantInput: CreateVariantInput,
  ) {
    return (await this.VariantService.create(createVariantInput)).dataValues;
  }

  @Query(() => [Variant], { name: 'Variants' })
  async findAll() {
    return await this.VariantService.findAll();
  }

  @Query(() => Variant, { name: 'Variant' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return (await this.VariantService.findOne({ id: id })).dataValues;
  }

  @Mutation(() => Variant)
  async updateVariant(
    @Args('updateVariantInput') updateVariantInput: UpdateVariantInput,
  ) {
    return (
      await this.VariantService.update(
        updateVariantInput.id,
        updateVariantInput,
      )
    ).dataValues;
  }

  @Mutation(() => Variant)
  async removeVariant(@Args('id', { type: () => String }) id: string) {
    return (await this.VariantService.remove(id)).dataValues;
  }
}
