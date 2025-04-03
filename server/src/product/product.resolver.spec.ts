import { Test, TestingModule } from '@nestjs/testing';
import { productProviders } from './product.provider';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { VariantService } from 'src/variant/variant.service';
import { ImageService } from 'src/image/image.service';
import { ShopService } from 'src/shop/shop.service';
import { AttributeService } from 'src/attribute/attribute.service';
import { BrandService } from 'src/brand/brand.service';
import { categoryProviders } from 'src/category/category.provider';
import { variantProviders } from 'src/variant/variant.provider';
import { imageProviders } from 'src/image/image.provider';
import { shopProviders } from 'src/shop/shop.providers';
import { attributeProviders } from 'src/attribute/attribute.provider';
import { brandProviders } from 'src/brand/brand.provider';

describe('ProductResolver', () => {
  let resolver: ProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductResolver,
        ProductService,
        ...productProviders,
        ...categoryProviders,
        VariantService,
        ...variantProviders,
        ImageService,
        ...imageProviders,
        ShopService,
        ...shopProviders,
        AttributeService,
        ...attributeProviders,
        BrandService,
        ...brandProviders,
        ...productProviders,
      ],
    }).compile();

    resolver = module.get<ProductResolver>(ProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
