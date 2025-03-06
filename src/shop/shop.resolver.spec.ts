import { Test, TestingModule } from '@nestjs/testing';
import { ShopsResolver } from './shop.resolver';
import { ShopsService } from './shop.service';
import { shopProviders } from './shop.providers';

describe('ShopsResolver', () => {
  let resolver: ShopsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopsResolver, ShopsService, ...shopProviders],
    }).compile();

    resolver = module.get<ShopsResolver>(ShopsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
