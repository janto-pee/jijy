import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';

@Resolver('Review')
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation('createReview')
  async create(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ) {
    return await this.reviewsService.create(createReviewInput);
  }

  @Query('reviews')
  async findAll() {
    return await this.reviewsService.findAll();
  }

  @Query('review')
  async findOne(@Args('id') id: number) {
    return await this.reviewsService.findOne(id);
  }

  @Mutation('updateReview')
  async update(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
  ) {
    return await this.reviewsService.update(
      updateReviewInput.id,
      updateReviewInput,
    );
  }

  @Mutation('removeReview')
  async remove(@Args('id') id: number) {
    return await this.reviewsService.remove(id);
  }
}
