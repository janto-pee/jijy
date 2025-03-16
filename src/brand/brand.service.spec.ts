import { Test, TestingModule } from '@nestjs/testing';
import { BrandService } from './brand.service';
import { brandProviders } from './brand.provider';

describe('BrandService', () => {
  let service: BrandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandService, ...brandProviders],
    }).compile();

    service = module.get<BrandService>(BrandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
