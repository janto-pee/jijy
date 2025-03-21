import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AttributeService } from './attribute.service';
import { Attribute } from './entities/attribute.entity';
import { CreateAttributeInput } from './dto/create-attribute.input';
import { UpdateAttributeInput } from './dto/update-attribute.input';
import { ProductService } from 'src/product/product.service';

@Resolver(() => Attribute)
export class AttributeResolver {
  constructor(
    private readonly attributeService: AttributeService,
    private readonly productService: ProductService,
  ) {}

  @Mutation(() => Attribute)
  async createAttribute(
    @Args('createAttributeInput') createAttributeInput: CreateAttributeInput,
  ) {
    return (await this.attributeService.create(createAttributeInput))
      .dataValues;
  }

  @Query(() => [Attribute], { name: 'Attributes' })
  async findAll() {
    return await this.attributeService.findAll();
  }

  @Query(() => Attribute, { name: 'Attribute' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    const data = await this.attributeService.findOne({ id: id });
    if (!data) {
      throw new Error('data not found');
    }
    return data.dataValues;
  }

  @Mutation(() => Attribute)
  async updateAttribute(
    @Args('updateAttributeInput') updateAttributeInput: UpdateAttributeInput,
  ) {
    const data = await this.attributeService.update(
      updateAttributeInput.id,
      updateAttributeInput,
    );
    return data.dataValues;
  }

  @Mutation(() => Attribute)
  async removeAttribute(@Args('id', { type: () => String }) id: string) {
    const data = await this.attributeService.remove(id);
    if (!data) {
      throw new Error('data not found');
    }
    return data.dataValues;
  }

  @ResolveField()
  async product(@Parent() attribute: Attribute) {
    const { productId } = attribute;
    return (await this.productService.findOne({ productId: productId }))
      .dataValues;
  }
}
