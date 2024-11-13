import { Test, TestingModule } from '@nestjs/testing';
import { SalesResolver } from './sales.resolver';
import { SalesService } from './sales.service';
import { salesProviders } from './sales.provider';

describe('SalesResolver', () => {
  let resolver: SalesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesResolver, SalesService, ...salesProviders],
    }).compile();

    resolver = module.get<SalesResolver>(SalesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
