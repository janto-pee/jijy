import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AttributesService } from './attributes.service';
import { CreateAttributeInput } from './dto/create-attribute.input';
import { UpdateAttributeInput } from './dto/update-attribute.input';

@Resolver('Attribute')
export class AttributesResolver {
  constructor(private readonly attributesService: AttributesService) {}

  @Mutation('createAttribute')
  async create(
    @Args('createAttributeInput') createAttributeInput: CreateAttributeInput,
  ) {
    return await this.attributesService.create(createAttributeInput);
  }

  @Query('attributes')
  async findAll() {
    return await this.attributesService.findAll();
  }

  @Query('attribute')
  async findOne(@Args('id') id: number) {
    return await this.attributesService.findOne(id);
  }

  @Mutation('updateAttribute')
  async update(
    @Args('updateAttributeInput') updateAttributeInput: UpdateAttributeInput,
  ) {
    return await this.attributesService.update(
      updateAttributeInput.id,
      updateAttributeInput,
    );
  }

  @Mutation('removeAttribute')
  async remove(@Args('id') id: number) {
    return await this.attributesService.remove(id);
  }
}
