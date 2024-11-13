import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';
import { reviewProviders } from './reviews.providers';

describe('ReviewsResolver', () => {
  let resolver: ReviewsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewsResolver, ReviewsService, ...reviewProviders],
    }).compile();

    resolver = module.get<ReviewsResolver>(ReviewsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
