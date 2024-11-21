import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation('createCategory')
  async create(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return await this.categoryService.create(createCategoryInput);
  }

  @Query('categorys')
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Query('category')
  async findOne(@Args('id') id: number) {
    return await this.categoryService.findOne(id);
  }

  @Mutation('updateCategory')
  async update(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return await this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation('removeCategory')
  async remove(@Args('id') id: number) {
    return await this.categoryService.remove(id);
  }
}
