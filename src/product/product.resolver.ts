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
    return await this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'Product' })
  async findAll() {
    return await this.productService.findAll();
  }

  @Query(() => Product, { name: 'Product' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.productService.findOne(id);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return await this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  async removeProduct(@Args('id', { type: () => String }) id: string) {
    return await this.productService.remove(id);
  }
}

// @Resolver('Product')
// export class ProductResolver {
//   constructor(
//     private readonly productService: productService,
//     // private readonly categoryService: CategoryService,
//     // private readonly variantService: VariantsService,
//     // private readonly imagesService: ImagesService,
//     // private readonly shopsService: ShopsService,
//     // private readonly attributeService: AttributesService,
//     // private readonly brandService: BrandsService,
//   ) {}

//   @Mutation('createProduct')
//   async create(
//     @Args('createProductInput') createProductInput: CreateProductInput,
//   ) {
//     // const category = await this.categoryService.findOne(
//     //   createProductInput.category,
//     // );
//     // if (!category) {
//     //   throw new Error('category not found');
//     // }
//     // const variant = await this.variantService.findOne(
//     //   createProductInput.variant,
//     // );
//     // if (!variant) {
//     //   throw new Error('variant not found');
//     // }
//     // const image = await this.imagesService.findOne(createProductInput.image);
//     // if (!image) {
//     //   throw new Error('images not found');
//     // }
//     // const shop = await this.shopsService.findOne(createProductInput.shop);
//     // if (!shop) {
//     //   throw new Error('shop not found');
//     // }
//     // const attribute = await this.attributeService.findOne(
//     //   createProductInput.attribute,
//     // );
//     // if (!attribute) {
//     //   throw new Error('attribute not found');
//     // }
//     // const brand = await this.brandService.findOne(createProductInput.brand);
//     // if (!brand) {
//     //   throw new Error('brand not found');
//     // }
//     const product = await this.productService.create(createProductInput);
//     // product.category = category;
//     // product.variant = variant;
//     // product.image = image;
//     // product.shop = shop;
//     // product.brand = brand;
//     // product.attribute = attribute;

//     await product.save();
//     return product;
//   }

//   @Query('products')
//   async findAll() {
//     return await this.productService.findAll();
//   }

//   @Query('product')
//   async findOne(@Args('id') id: string) {
//     return await this.productService.findOne(id);
//   }

//   @Mutation('updateProduct')
//   async update(
//     @Args('updateProductInput') updateProductInput: UpdateProductInput,
//   ) {
//     return await this.productService.update(
//       updateProductInput.id,
//       updateProductInput,
//     );
//   }

//   @Mutation('removeProduct')
//   async remove(@Args('id') id: string) {
//     return await this.productService.remove(id);
//   }

//   // @ResolveField('category')
//   // async getCategory(@Parent() product) {
//   //   const { id } = product;
//   //   return await this.categoryService.findOneByProduct(id);
//   // }
// }
