import { Review } from './entities/review.entity';

export const reviewProviders = [
  {
    provide: 'REVIEWS_REPOSITORY',
    useValue: Review,
  },
];
