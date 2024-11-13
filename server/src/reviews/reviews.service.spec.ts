import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { reviewProviders } from './reviews.providers';

describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewsService, ...reviewProviders],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
