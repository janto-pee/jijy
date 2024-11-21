import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation('createProduct')
  async create(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return await this.productService.create(createProductInput);
  }

  @Query('products')
  async findAll() {
    return await this.productService.findAll();
  }

  @Query('product')
  async findOne(@Args('id') id: number) {
    return await this.productService.findOne(id);
  }

  @Mutation('updateProduct')
  async update(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return await this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation('removeProduct')
  async remove(@Args('id') id: number) {
    return await this.productService.remove(id);
  }
}
