import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { ProductService } from 'src/product/product.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return (await this.categoryService.create(createCategoryInput)).dataValues;
  }

  @Query(() => [Category], { name: 'Categorys' })
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'Category' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    const data = await this.categoryService.findOne({ id: id });
    if (!data) {
      throw new Error('data not found');
    }
    return data.dataValues;
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    const data = await this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
    return data.dataValues;
  }

  @Mutation(() => Category)
  async removeCategory(@Args('id', { type: () => String }) id: string) {
    const data = await this.categoryService.remove(id);
    if (!data) {
      throw new Error('address not found');
    }
    return data.dataValues;
  }

  /**
   *
   * RESOLVER
   */

  @ResolveField()
  async product(@Parent() category: Category) {
    const { id } = category;
    return (await this.productService.findOne({ productId: id })).dataValues;
  }
}
