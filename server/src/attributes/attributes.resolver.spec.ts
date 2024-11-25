import { Test, TestingModule } from '@nestjs/testing';
import { AttributesResolver } from './attributes.resolver';
import { AttributesService } from './attributes.service';
import { attributesProviders } from './attributes.provider';
import { ProductService } from 'src/product/product.service';
import { productProviders } from 'src/product/product.provider';

describe('AttributesResolver', () => {
  let resolver: AttributesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttributesResolver,
        AttributesService,
        ...attributesProviders,
        ProductService,
        ...productProviders,
      ],
    }).compile();

    resolver = module.get<AttributesResolver>(AttributesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
