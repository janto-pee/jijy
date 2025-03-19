import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    const product = await this.productService.create(createProductInput);
    return product.dataValues;
  }

  @Query(() => [Product], { name: 'Products' })
  async findAll() {
    const product = await this.productService.findAll();
    return product;
  }

  @Query(() => Product, { name: 'Product' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return (await this.productService.findOne(id)).dataValues;
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    const data = await this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
    return data.dataValues;
  }

  @Mutation(() => Product)
  async removeProduct(@Args('id', { type: () => String }) id: string) {
    return (await this.productService.remove(id)).dataValues;
  }
}
