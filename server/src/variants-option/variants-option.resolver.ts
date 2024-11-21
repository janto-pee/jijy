import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VariantsOptionService } from './variants-option.service';
import { CreateVariantsOptionInput } from './dto/create-variants-option.input';
import { UpdateVariantsOptionInput } from './dto/update-variants-option.input';

@Resolver('VariantsOption')
export class VariantsOptionResolver {
  constructor(private readonly variantsOptionService: VariantsOptionService) {}

  @Mutation('createVariantsOption')
  async create(
    @Args('createVariantsOptionInput')
    createVariantsOptionInput: CreateVariantsOptionInput,
  ) {
    return await this.variantsOptionService.create(createVariantsOptionInput);
  }

  @Query('variantsOptions')
  async findAll() {
    return await this.variantsOptionService.findAll();
  }

  @Query('variantsOption')
  async findOne(@Args('id') id: number) {
    return await this.variantsOptionService.findOne(id);
  }

  @Mutation('updateVariantsOption')
  async update(
    @Args('updateVariantsOptionInput')
    updateVariantsOptionInput: UpdateVariantsOptionInput,
  ) {
    return await this.variantsOptionService.update(
      updateVariantsOptionInput.id,
      updateVariantsOptionInput,
    );
  }

  @Mutation('removeVariantsOption')
  async remove(@Args('id') id: number) {
    return await this.variantsOptionService.remove(id);
  }
}
