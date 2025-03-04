import { Test, TestingModule } from '@nestjs/testing';
import { ShopsService } from './shops.service';
import { shopsProviders } from './shops.provider';

describe('ShopsService', () => {
  let service: ShopsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopsService, ...shopsProviders],
    }).compile();

    service = module.get<ShopsService>(ShopsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
