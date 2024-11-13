import { Test, TestingModule } from '@nestjs/testing';
import { VariantsResolver } from './variants.resolver';
import { VariantsService } from './variants.service';
import { variantsProviders } from './variants.provider';

describe('VariantsResolver', () => {
  let resolver: VariantsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariantsResolver, VariantsService, ...variantsProviders],
    }).compile();

    resolver = module.get<VariantsResolver>(VariantsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
