import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AttributesService } from './attributes.service';
import { CreateAttributeInput } from './dto/create-attribute.input';
import { UpdateAttributeInput } from './dto/update-attribute.input';

@Resolver('Attribute')
export class AttributesResolver {
  constructor(private readonly attributesService: AttributesService) {}

  @Mutation('createAttribute')
  create(@Args('createAttributeInput') createAttributeInput: CreateAttributeInput) {
    return this.attributesService.create(createAttributeInput);
  }

  @Query('attributes')
  findAll() {
    return this.attributesService.findAll();
  }

  @Query('attribute')
  findOne(@Args('id') id: number) {
    return this.attributesService.findOne(id);
  }

  @Mutation('updateAttribute')
  update(@Args('updateAttributeInput') updateAttributeInput: UpdateAttributeInput) {
    return this.attributesService.update(updateAttributeInput.id, updateAttributeInput);
  }

  @Mutation('removeAttribute')
  remove(@Args('id') id: number) {
    return this.attributesService.remove(id);
  }
}
