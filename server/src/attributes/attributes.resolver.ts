import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AttributesService } from './attributes.service';
import { CreateAttributeInput } from './dto/create-attribute.input';
import { UpdateAttributeInput } from './dto/update-attribute.input';
import { ProductService } from 'src/product/product.service';

@Resolver('Attribute')
export class AttributesResolver {
  constructor(
    private readonly attributesService: AttributesService,
    private readonly productService: ProductService,
  ) {}

  @Mutation('createAttribute')
  async create(
    @Args('createAttributeInput') createAttributeInput: CreateAttributeInput,
  ) {
    const attribute = await this.attributesService.create(createAttributeInput);
    return attribute;
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
