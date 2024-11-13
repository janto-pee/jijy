import { Test, TestingModule } from '@nestjs/testing';
import { VariantsOptionResolver } from './variants-option.resolver';
import { VariantsOptionService } from './variants-option.service';
import { VariantsOptionProviders } from './variants-option.provider';

describe('VariantsOptionResolver', () => {
  let resolver: VariantsOptionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VariantsOptionResolver,
        VariantsOptionService,
        ...VariantsOptionProviders,
      ],
    }).compile();

    resolver = module.get<VariantsOptionResolver>(VariantsOptionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
