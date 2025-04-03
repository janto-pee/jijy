import { Test, TestingModule } from '@nestjs/testing';
import { VariantResolver } from './variant.resolver';
import { VariantService } from './variant.service';
import { variantProviders } from './variant.provider';

describe('VariantsResolver', () => {
  let resolver: VariantResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariantResolver, VariantService, ...variantProviders],
    }).compile();

    resolver = module.get<VariantResolver>(VariantResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
