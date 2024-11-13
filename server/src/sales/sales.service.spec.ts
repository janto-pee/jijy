import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from './sales.service';
import { salesProviders } from './sales.provider';

describe('SalesService', () => {
  let service: SalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesService, ...salesProviders],
    }).compile();

    service = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
