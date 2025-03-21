import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: typeof Category,
  ) {}

  async create(createCatgeoriesInput: CreateCategoryInput): Promise<Category> {
    return await this.categoryRepository.create({
      ...createCatgeoriesInput,
    });
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll<Category>({ raw: true });
  }

  async findOne(search: any): Promise<Category> {
    const category = await this.categoryRepository.findOne<Category>({
      where: search,
    });
    if (!category) {
      throw new Error();
    }
    return category;
  }

  async update(id: string, data: UpdateCategoryInput): Promise<Category> {
    const Category = await this.categoryRepository.findOne({
      where: { id: id },
    });
    if (!Category) {
      throw new Error('Category not found');
    }
    await Category.update({ ...data });
    await Category.save();
    return Category;
  }

  async remove(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne<Category>({
      where: { id: id },
    });
    if (!category) {
      throw new Error();
    }
    await category.destroy();
    return category;
  }
}
