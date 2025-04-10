import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { categoryProviders } from './category.provider';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, ...categoryProviders],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
