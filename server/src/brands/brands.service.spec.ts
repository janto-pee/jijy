import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './brands.service';
import { brandsProviders } from './brands.provider';

describe('BrandsService', () => {
  let service: BrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandsService, ...brandsProviders],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
