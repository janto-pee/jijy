import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { AttributeService } from 'src/attribute/attribute.service';
import { CategoryService } from 'src/category/category.service';
import { VariantService } from 'src/variant/variant.service';
import { ShopService } from 'src/shop/shop.service';
import { BrandService } from 'src/brand/brand.service';
import { ImageService } from 'src/image/image.service';
import { TagService } from 'src/tag/tag.service';
import { ProductRepone } from './dto/create-product.response';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly attributeService: AttributeService,
    private readonly categoryService: CategoryService,
    private readonly variantService: VariantService,
    private readonly shopService: ShopService,
    private readonly brandService: BrandService,
    private readonly imageService: ImageService,
    private readonly tagService: TagService,
  ) {}

  @Mutation(() => ProductRepone)
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
    return (await this.productService.findOne({ id: id })).dataValues;
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

  @ResolveField()
  async attributes(@Parent() product: Product) {
    const { id } = product;
    return (await this.attributeService.findOne({ productId: id })).dataValues;
  }
  @ResolveField()
  async categorys(@Parent() product: Product) {
    const { categoryId } = product;
    return (await this.categoryService.findOne({ id: categoryId })).dataValues;
  }
  @ResolveField()
  async variants(@Parent() product: Product) {
    const { variantId } = product;
    return (await this.variantService.findOne({ id: variantId })).dataValues;
  }
  @ResolveField()
  async shop(@Parent() product: Product) {
    const { shopId } = product;
    return (await this.shopService.findOne({ id: shopId })).dataValues;
  }
  @ResolveField()
  async brands(@Parent() product: Product) {
    const { brandId } = product;
    return (await this.brandService.findOne({ id: brandId })).dataValues;
  }
  @ResolveField()
  async image(@Parent() product: Product) {
    const { id } = product;
    return await this.imageService.filterBy({ prouductId: id });
  }

  @ResolveField()
  async tag(@Parent() product: Product) {
    const { id } = product;
    return await this.tagService.filterBy({ prouductId: id });
  }
}
