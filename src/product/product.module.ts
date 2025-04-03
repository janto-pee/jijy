import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { productProviders } from './product.provider';
import { DatabaseModule } from 'src/database.module';
import { VariantService } from 'src/variant/variant.service';
import { variantProviders } from 'src/variant/variant.provider';
import { ShopService } from 'src/shop/shop.service';
import { shopProviders } from 'src/shop/shop.providers';
import { AttributeService } from 'src/attribute/attribute.service';
import { attributeProviders } from 'src/attribute/attribute.provider';
import { ImageService } from 'src/image/image.service';
import { imageProviders } from 'src/image/image.provider';
import { BrandService } from 'src/brand/brand.service';
import { brandProviders } from 'src/brand/brand.provider';
import { CategoryService } from 'src/category/category.service';
import { categoryProviders } from 'src/category/category.provider';
import { TagService } from 'src/tag/tag.service';
import { tagProviders } from 'src/tag/tag.providers';
import { UserService } from 'src/user/user.service';
import { userProviders } from 'src/user/user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ProductResolver,
    ProductService,
    ...productProviders,
    VariantService,
    ...variantProviders,
    ShopService,
    ...shopProviders,
    AttributeService,
    ...attributeProviders,
    ImageService,
    ...imageProviders,
    BrandService,
    ...brandProviders,
    CategoryService,
    ...categoryProviders,
    TagService,
    ...tagProviders,
    UserService,
    ...userProviders,
  ],
})
export class ProductModule {}
// VariantsService,
// ...variantsProviders,
// ShopsService,
// ...shopProviders,
// AttributesService,
// ImagesService,
// ...imageProviders,
// ...attributesProviders,
// BrandsService,
// CategoryService,
// ...categoryProviders,
// ...brandsProviders,
