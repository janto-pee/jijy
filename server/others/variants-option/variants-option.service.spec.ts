import { Test, TestingModule } from '@nestjs/testing';
import { VariantsOptionService } from './variants-option.service';

describe('VariantsOptionService', () => {
  let service: VariantsOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariantsOptionService],
    }).compile();

    service = module.get<VariantsOptionService>(VariantsOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
