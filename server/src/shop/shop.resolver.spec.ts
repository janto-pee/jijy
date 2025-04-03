import { Test, TestingModule } from '@nestjs/testing';
import { ShopResolver } from './shop.resolver';
import { ShopService } from './shop.service';
import { shopProviders } from './shop.providers';

describe('ShopResolver', () => {
  let resolver: ShopResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopResolver, ShopService, ...shopProviders],
    }).compile();

    resolver = module.get<ShopResolver>(ShopResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
