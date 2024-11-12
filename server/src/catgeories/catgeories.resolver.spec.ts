import { Test, TestingModule } from '@nestjs/testing';
import { CatgeoriesResolver } from './catgeories.resolver';
import { CatgeoriesService } from './catgeories.service';

describe('CatgeoriesResolver', () => {
  let resolver: CatgeoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatgeoriesResolver, CatgeoriesService],
    }).compile();

    resolver = module.get<CatgeoriesResolver>(CatgeoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
