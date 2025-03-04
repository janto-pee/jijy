import { Test, TestingModule } from '@nestjs/testing';
import { BrandResolver } from './brand.resolver';
import { BrandService } from './brand.service';
import { brandProviders } from './brand.provider';

describe('BrandResolver', () => {
  let resolver: BrandResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandResolver, BrandService, ...brandProviders],
    }).compile();

    resolver = module.get<BrandResolver>(BrandResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
