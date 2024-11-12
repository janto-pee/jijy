import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { reviewProviders } from './reviews.providers';

@Module({
  providers: [ReviewsResolver, ReviewsService, ...reviewProviders],
})
export class ReviewsModule {}
