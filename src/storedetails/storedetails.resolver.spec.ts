import { Test, TestingModule } from '@nestjs/testing';
import { StoredetailsResolver } from './storedetails.resolver';
import { StoredetailsService } from './storedetails.service';
import { storedetailsProviders } from './storedetails.provider';

describe('StoredetailsResolver', () => {
  let resolver: StoredetailsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoredetailsResolver,
        StoredetailsService,
        ...storedetailsProviders,
      ],
    }).compile();

    resolver = module.get<StoredetailsResolver>(StoredetailsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
