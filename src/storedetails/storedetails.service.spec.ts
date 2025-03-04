import { Test, TestingModule } from '@nestjs/testing';
import { StoredetailsService } from './storedetails.service';
import { storedetailsProviders } from './storedetails.provider';

describe('StoredetailsService', () => {
  let service: StoredetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoredetailsService, ...storedetailsProviders],
    }).compile();

    service = module.get<StoredetailsService>(StoredetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
