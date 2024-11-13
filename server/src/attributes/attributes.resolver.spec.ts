import { Test, TestingModule } from '@nestjs/testing';
import { AttributesResolver } from './attributes.resolver';
import { AttributesService } from './attributes.service';
import { attributesProviders } from './attributes.provider';

describe('AttributesResolver', () => {
  let resolver: AttributesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttributesResolver,
        AttributesService,
        ...attributesProviders,
      ],
    }).compile();

    resolver = module.get<AttributesResolver>(AttributesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
