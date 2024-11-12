import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VariantsOptionService } from './variants-option.service';
import { CreateVariantsOptionInput } from './dto/create-variants-option.input';
import { UpdateVariantsOptionInput } from './dto/update-variants-option.input';

@Resolver('VariantsOption')
export class VariantsOptionResolver {
  constructor(private readonly variantsOptionService: VariantsOptionService) {}

  @Mutation('createVariantsOption')
  create(
    @Args('createVariantsOptionInput')
    createVariantsOptionInput: CreateVariantsOptionInput,
  ) {
    return this.variantsOptionService.create(createVariantsOptionInput);
  }

  @Query('variantsOption')
  findAll() {
    return this.variantsOptionService.findAll();
  }

  @Query('variantsOption')
  findOne(@Args('id') id: number) {
    return this.variantsOptionService.findOne(id);
  }

  @Mutation('updateVariantsOption')
  update(
    @Args('updateVariantsOptionInput')
    updateVariantsOptionInput: UpdateVariantsOptionInput,
  ) {
    return this.variantsOptionService.update({
      where: updateVariantsOptionInput.id,
      data: updateVariantsOptionInput,
    });
  }

  @Mutation('removeVariantsOption')
  remove(@Args('id') id: number) {
    return this.variantsOptionService.remove(id);
  }
}
