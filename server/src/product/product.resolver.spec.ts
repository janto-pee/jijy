import { Test, TestingModule } from '@nestjs/testing';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { productProviders } from './product.provider';
import { CategoryService } from 'src/category/category.service';
import { VariantsService } from 'src/variants/variants.service';
import { ImagesService } from 'src/images/images.service';
import { ShopsService } from 'src/shops/shops.service';
import { AttributesService } from 'src/attributes/attributes.service';
import { BrandsService } from 'src/brands/brands.service';
import { categoryProviders } from 'src/category/category.provider';
import { variantsProviders } from 'src/variants/variants.provider';
import { imageProviders } from 'src/images/images.provider';
import { shopProviders } from 'src/shops/shops.providers';
import { attributesProviders } from 'src/attributes/attributes.provider';
import { brandsProviders } from 'src/brands/brands.provider';

describe('ProductResolver', () => {
  let resolver: ProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    resolver = module.get<ProductResolver>(ProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
