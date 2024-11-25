import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { productProviders } from './product.provider';
import { CategoryService } from 'src/category/category.service';
import { categoryProviders } from 'src/category/category.provider';
import { VariantsService } from 'src/variants/variants.service';
import { variantsProviders } from 'src/variants/variants.provider';
import { ImagesService } from 'src/images/images.service';
import { imageProviders } from 'src/images/images.provider';
import { ShopsService } from 'src/shops/shops.service';
import { shopProviders } from 'src/shops/shops.providers';
import { AttributesService } from 'src/attributes/attributes.service';
import { attributesProviders } from 'src/attributes/attributes.provider';
import { BrandsService } from 'src/brands/brands.service';
import { brandsProviders } from 'src/brands/brands.provider';

@Module({
  providers: [
    ProductResolver,
    ProductService,
    ...productProviders,
    CategoryService,
    ...categoryProviders,
    VariantsService,
    ...variantsProviders,
    ImagesService,
    ...imageProviders,
    ShopsService,
    ...shopProviders,
    AttributesService,
    ...attributesProviders,
    BrandsService,
    ...brandsProviders,
  ],
})
export class ProductModule {}
