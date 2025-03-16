import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AttributeService } from './attribute.service';
import { Attribute } from './entities/attribute.entity';
import { CreateAttributeInput } from './dto/create-attribute.input';
import { UpdateAttributeInput } from './dto/update-attribute.input';

@Resolver(() => Attribute)
export class AttributeResolver {
  constructor(private readonly attributeService: AttributeService) {}

  @Mutation(() => Attribute)
  async createAttribute(
    @Args('createAttributeInput') createAttributeInput: CreateAttributeInput,
  ) {
    return await this.attributeService.create(createAttributeInput);
  }

  @Query(() => [Attribute], { name: 'Attributes' })
  async findAll() {
    return await this.attributeService.findAll();
  }

  @Query(() => Attribute, { name: 'Attribute' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.attributeService.findOne(id);
  }

  @Mutation(() => Attribute)
  async pdateAttribute(
    @Args('updateAttributeInput') updateAttributeInput: UpdateAttributeInput,
  ) {
    return await this.attributeService.update(
      updateAttributeInput.id,
      updateAttributeInput,
    );
  }

  @Mutation(() => Attribute)
  async removeAttribute(@Args('id', { type: () => String }) id: string) {
    return await this.attributeService.remove(id);
  }
}
