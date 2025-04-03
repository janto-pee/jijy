import { Test, TestingModule } from '@nestjs/testing';
import { VariantService } from './variant.service';
import { variantProviders } from './variant.provider';

describe('VariantsService', () => {
  let service: VariantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariantService, ...variantProviders],
    }).compile();

    service = module.get<VariantService>(VariantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
