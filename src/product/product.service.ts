import { Inject, Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private ProductsRepository: typeof Product,
  ) {}
  async create(createProductInput: CreateProductInput): Promise<Product> {
    return await this.ProductsRepository.create(
      {
        ...createProductInput,
      },
      { raw: true },
    );
  }

  async findAll(): Promise<Product[]> {
    return await this.ProductsRepository.findAll<Product>({
      raw: true,
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.ProductsRepository.findOne<Product>({
      where: { id: id },
    });
    if (!product) {
      throw new Error();
    }
    return product;
  }

  async findEmail(email: string): Promise<Product> {
    const product = await this.ProductsRepository.findOne<Product>({
      where: { email: email },
    });
    if (!product) {
      throw new Error();
    }
    return product;
  }

  async update(id: string, data: UpdateProductInput): Promise<Product> {
    const Product = await this.ProductsRepository.findOne({
      where: { id: id },
    });
    if (!Product) {
      throw new Error('Product not found');
    }
    await Product.update({ ...data });
    await Product.save();
    return Product;
  }

  async remove(id: string): Promise<Product> {
    const product = await this.ProductsRepository.findOne<Product>({
      where: { id: id },
    });
    if (!product) {
      throw new Error();
    }
    await product.destroy();
    return product;
  }
}
