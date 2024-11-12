import { Review } from './entities/Review.entity';

export const reviewProviders = [
  {
    provide: 'REVIEWS_REPOSITORY',
    useValue: Review,
  },
];
