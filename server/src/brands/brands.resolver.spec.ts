import { Test, TestingModule } from '@nestjs/testing';
import { BrandsResolver } from './brands.resolver';
import { BrandsService } from './brands.service';
import { brandsProviders } from './brands.provider';

describe('BrandsResolver', () => {
  let resolver: BrandsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandsResolver, BrandsService, ...brandsProviders],
    }).compile();

    resolver = module.get<BrandsResolver>(BrandsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
