import { Test, TestingModule } from '@nestjs/testing';
import { VariantsService } from './variants.service';
import { variantsProviders } from './variants.provider';

describe('VariantsService', () => {
  let service: VariantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariantsService, ...variantsProviders],
    }).compile();

    service = module.get<VariantsService>(VariantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
